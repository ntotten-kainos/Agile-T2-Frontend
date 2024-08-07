import OpenAI from "openai";

const openai = new OpenAI(
);

async function interviewer() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are an interviewer for a job in the tech sector." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

interviewer();