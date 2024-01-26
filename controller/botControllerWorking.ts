require("dotenv").config();
import { Request, Response, Application } from "express";
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

const chatHistory: string[] = [];

module.exports = function (app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res.render("index", { chatHistory });
  });

  app.post("/ask", async (req: Request, res: Response) => {
    try {
      const assistantId = "asst_xEHe7EABdb3PcsOWpwMLUsPa";
      const assistant = await openai.beta.assistants.retrieve(assistantId);

      console.log(
        "\nAssistant: Hello there! I'm here to help find information about a job!",
      );
      chatHistory.push(
        "Assistant: Hello there! I'm here to help find information about a job!",
      );

      const thread = await openai.beta.threads.create();

      let keepAsking = true;
      while (keepAsking) {
        const userQuestion = await askQuestion(
          "\nAssistant: What is your question? ",
        );
        chatHistory.push("Assistant: What is your question? ");

        await openai.beta.threads.messages.create(thread.id, {
          role: "user",
          content: userQuestion,
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
          assistant_id: assistant.id,
        });

        let runStatus = await openai.beta.threads.runs.retrieve(
          thread.id,
          run.id,
        );

        while (runStatus.status !== "completed") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          runStatus = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id,
          );
        }

        const messages = await openai.beta.threads.messages.list(thread.id);

        const lastMessageForRun = messages.data
          .filter(
            (message) =>
              message.run_id === run.id && message.role === "assistant",
          )
          .pop();

        if (lastMessageForRun) {
          lastMessageForRun.content.forEach((contentItem) => {
            if ("text" in contentItem) {
              const assistantResponse: string = contentItem.text.value;
              console.log(`\nAssistant: ${assistantResponse}\n`);
              chatHistory.push(`User: ${userQuestion}`);
              chatHistory.push(`Assistant: ${assistantResponse}`);
            }
          });
        } else if (
          !["failed", "cancelled", "expired"].includes(runStatus.status)
        ) {
          console.log("Assistant: Unable to complete the request.");
        }

        const continueAsking = await askQuestion(
          "Assistant: Do you want to ask another question? (yes/no) \n",
        );
        keepAsking = continueAsking.toLowerCase() === "yes";

        if (!keepAsking) {
          console.log(
            "Assistant: Thank you for using the Kainos Job Management System\n",
          );
          chatHistory.push(
            "Assistant: Thank you for using the Kainos Job Management System",
          );
        }
      }
      res.render("index", { chatHistory });
    } catch (error) {
      console.error(error);
    }
  });
};
