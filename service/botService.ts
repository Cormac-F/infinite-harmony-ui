require("dotenv").config();
import OpenAI from "openai";
import * as readline from "readline";

const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
      rl.close;
    });
  });
}

module.exports.getReplyFromApi = async function (): Promise<string[]> {
  const assistantId = "asst_xEHe7EABdb3PcsOWpwMLUsPa";
  const assistant = await openai.beta.assistants.retrieve(assistantId);

  const thread = await openai.beta.threads.create();

  const userQuestion = await askQuestion(
    "\nAssistant: What is your question? ",
  );

  try {
    const response = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userQuestion,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    const messages = await openai.beta.threads.messages.list(thread.id);

    const assistantResponses: string[] = [];

    messages.data.forEach((message) => {
      if (message.role === "assistant") {
        message.content.forEach((contentItem) => {
          if ("text" in contentItem) {
            const assistantResponse = contentItem.text.value;
            assistantResponses.push(assistantResponse);
          }
        });
      }
    });

    return assistantResponses;
  } catch (e) {
    throw new Error("No response from OpenAI");
  }
};
