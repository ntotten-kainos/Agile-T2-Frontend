import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
import { getAllJobRoles } from "./controllers/JobRoleController";
import { UserRole } from "./models/JwtToken";
import { allowRoles, setLoggedInStatus } from "./middleware/AuthMiddleware";
import { askQuestion, getFeedback, recordAnswer } from "./client/InterviewBot";

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

// AI Mock Interview
app.post('/askQuestion', async (req, res) => {
  try {
    const question = await askQuestion();
    res.json({ question });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/recordAnswer', async (req, res) => {
  try {
    await recordAnswer(req.body.answer);
    const question = await askQuestion();
    res.json({ question });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/getFeedback', async (req, res) => {
  try {
    const feedback = await getFeedback(req.body.answer);
    res.json({ feedback });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/mockInterview', async (req: express.Request, res: express.Response) => {
  res.render("mockInterview.html");
});