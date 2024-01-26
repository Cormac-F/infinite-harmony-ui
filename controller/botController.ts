import { Request, Response, Application, response } from "express";

const botService = require("../service/botService");

module.exports = function (app: Application) {
  app.post("/ask", async (req: Request, res: Response) => {
    let responses: undefined | string[] = [];
    try {
      responses = await botService.getReplyFromApi(req.body.userInput);
      console.log("Assistant responses:", responses);
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
    res.render("index", responses);
  });
};
