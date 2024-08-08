import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
});

const SE_Associate: string =
  "As a Software Engineer (Associate) in Kainos, you'll be responsible for developing high"
  + "quality solutions which delight our customers and impact the lives of users worldwide."
  + "You'll do this whilst learning about new technologies and approaches, with talented"
  + "colleagues that will help you to learn, develop and grow.";

const TA_Partner: string = "The Talent Acquisition team at Kainos are responsible for end to end delivery aligned to BU"
+ "hiring demands. Based in locations across UK &I, Europe and North America, the team"
+ "focus on direct sourcing channels to create a best in class candidate experience, in the"
+ "most cost-effective way,"
+ "As a Talent Acquisition Partner (Senior Associate), you will work closely with team members"
+ "to manage the attraction and acquisition of high calibre talent. Providing best in class"
+ "candidate experience and acting as a brand ambassador for recruitment at Kainos"
+ "internally and externally.";

const DS_Trainee: string = "As a Trainee Data Scientist in Kainos, you'll be responsible for contributing to the"
+ "development of high-quality solutions that use AI and ML technologies to delight our"
+ "customers and impact the lives of users worldwide. You'll do this whilst gaining awareness"
+ "and learning about new technologies, and approaches, with talented colleagues that"
+ "will help you to learn, develop and grow.";

const Lead_Security_Engineer: string = "As a Lead Security Engineer (Consultant) in Kainos, you will be responsible for leading our"
+ "security engineering and security testing efforts across Kainos Platforms and Services. They"
+ "will set direction on our security testing methodology, engagement scoping, outputs and"
+ "tool/technology selections, whilst developing our more junior security engineers"
+ "accordingly."
+ "They'll work with agile delivery teams to develop good security practices throughout the"
+ "software development journey. As a technical leader in the team, you will share"
+ "knowledge and help educate our customers and Kainos team members on good security"
+ "practices."
+ "You'll manage, coach and develop a small number of staff, with a focus on managing"
+ "employee performance and assisting in their career development. You'll also provide"
+ "direction and leadership for your team as you solve challenging problems together.";

const jobDescriptions: string[] = [Lead_Security_Engineer, DS_Trainee, TA_Partner, SE_Associate];

const conversationHistory: ChatCompletionMessageParam[] = [
  { role: "system", content: "You are an interviewer for a job in the tech sector. Interview the user for the following job description, one question at a time: " + jobDescriptions[1] }
];

async function askQuestion() {
  const completion = await openai.chat.completions.create({
    messages: conversationHistory,
    model: "gpt-3.5-turbo",
  });

  const question = completion.choices[0].message?.content;
  if (question) {
    conversationHistory.push({ role: "assistant", content: question });
  }

  return question;
}

async function getFeedback(userAnswer: string) {
  conversationHistory.push({ role: "user", content: userAnswer });
  conversationHistory.push({ role: "system", content: "Provide feedback on the user's responses to the interview questions, such as how they could improve." });

  const completion = await openai.chat.completions.create({
    messages: conversationHistory,
    model: "gpt-3.5-turbo",
  });

  const feedback = completion.choices[0].message?.content;
  if (feedback) {
    conversationHistory.push({ role: "assistant", content: feedback });
  }

  return feedback;
}

async function recordAnswer(userAnswer: string) {
  conversationHistory.push({ role: "user", content: userAnswer });
}

export { askQuestion, getFeedback, recordAnswer };