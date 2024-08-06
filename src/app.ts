import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
import { getAllJobRoles } from "./controllers/JobRoleController";
import { UserRole } from "./models/JwtToken";
import { allowRoles, setLoggedInStatus } from "./middleware/AuthMiddleware";
import { v4 as uuidv4 } from 'uuid';
import { getChatGPTResponse } from "../src/utils/interviewBot";

const app = express();

app.use(express.static('public'));
app.set('view engine', 'html')

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable is not defined.');

}

app.use(session({ secret: sessionSecret, cookie: { maxAge: 28800000 } }));

app.use(setLoggedInStatus);

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');

});

// Login
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);

// Log out
app.get('/logout', logout)

// Home
app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

// Job Roles
app.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]),getAllJobRoles);

// AI Mock Interview Assistant

const OPENAI_API_KEY = process.env.INTERVIEW_AI_API_KEY;

interface InterviewSession {
  jobDescription: string;
  currentQuestionIndex: number;
  questions: string[];
  answers: string[];
}

const sessions: Record<string, InterviewSession> = {};

app.post('/start-interview', allowRoles([UserRole.User, UserRole.Admin]), async (req, res) => {
  const jobDescription = req.body.jobDescription;

  if (!jobDescription) {
    return res.status(400).json({ error: 'Job description is required' });
  }

  const prompt = `I am interviewing a candidate for the following job: ${jobDescription}. 
  Ask the candidate three relevant interview questions.`;

  try {
    const response = await getChatGPTResponse(prompt, OPENAI_API_KEY);
    const questions = response.split('\n').filter(q => q.trim() !== '');

    if (questions.length > 0) {
      const sessionId = uuidv4();
      sessions[sessionId] = {
        jobDescription,
        currentQuestionIndex: 0,
        questions,
        answers: []
      };
      res.json({ sessionId, question: questions[0] });
    } else {
      res.status(500).json({ error: 'Failed to generate interview questions' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from OpenAI API' });
  }
});

app.post('/answer', allowRoles([UserRole.User, UserRole.Admin]), async (req, res) => {
  const sessionId = req.body.sessionId;
  const answer = req.body.answer;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }
  if (!answer) {
    return res.status(400).json({ error: 'Answer is required' });
  }

  const session = sessions[sessionId];
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  session.answers.push(answer);
  session.currentQuestionIndex += 1;

  if (session.currentQuestionIndex < session.questions.length) {
    const nextQuestion = session.questions[session.currentQuestionIndex];
    res.json({ question: nextQuestion });
  } else {
    const feedbackPrompt = `The candidate answered the questions as follows:\n` +
      session.questions.map((q, i) => `Q: ${q}\nA: ${session.answers[i]}`).join('\n') +
      `\n\nProvide feedback on their answers and suggest any improvements.`;

    try {
      const feedback = await getChatGPTResponse(feedbackPrompt, OPENAI_API_KEY);
      res.json({ message: 'Interview completed. Thank you!', feedback });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching feedback from OpenAI API' });
    }
  }
});