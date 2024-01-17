import { Request, Response, Application } from "express";
import OpenAI from "openai";
import cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import * as nunjucks from 'nunjucks';
import { Responsibility } from "../model/responsibility";
import { Job } from "../model/job";


const jobService = require("../service/jobService");
const openai = new OpenAI();
const speechFile = path.resolve("./view-job-spec.mp3");

module.exports = function(app: Application){
  app.get('/generate-speech/:id', async (req: Request, res: Response) => {
    let data: Job;
    let dataRole: Responsibility[];

    try {
        data = await jobService.getJobSpecById(req.params.id);
        dataRole = await jobService.getRoleResponsibilityById(req.params.id);
    } catch (e) {
        console.error(e);
    }

    const htmlContent: string = nunjucks.render('view-job-spec.html', { job: data, responsibilities: dataRole });

    const $ = cheerio.load(htmlContent);
    const websiteText = $('h2, th, td').map((i, element) => {
      const el = $(element);
      return el.text() + (el.attr('href') ? ' - Link: ' + el.attr('href') : '');
    }).get().join('').replace(/\//g, '');

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: websiteText,
    });

    const buffer: Buffer = Buffer.from(await mp3.arrayBuffer());

    res.setHeader('Content-Type', 'audio/mpeg');

    res.send(buffer);

  });
};

