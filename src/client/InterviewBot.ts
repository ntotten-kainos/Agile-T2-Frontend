import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
});

const jobDescription: string = 
  "As a Software Engineer (Associate) in Kainos, you’ll be responsible for developing high"
+ "quality solutions which delight our customers and impact the lives of users worldwide."
+ "You’ll do this whilst learning about new technologies and approaches, with talented"
+ "colleagues that will help you to learn, develop and grow."; 

  let conversationHistory: ChatCompletionMessageParam[] = [
    { role: "system", content: "You are an interviewer for a job in the tech sector. Interview the user for the following job description, one question at a time: " + jobDescription }
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