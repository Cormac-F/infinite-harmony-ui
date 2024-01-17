import { Request, Response, Application } from "express";
import OpenAI from "openai";
import cheerio from 'cheerio';
import * as nunjucks from 'nunjucks';
import { Responsibility } from "../model/responsibility";
import { Job } from "../model/job";
import * as cache from 'memory-cache';

const jobService = require("../service/jobService");
const openai = new OpenAI();

module.exports = function(app: Application) {
    app.get('/generate-speech/:id', async (req: Request, res: Response) => {
        let data: Job;
        let dataRole: Responsibility[];

        try {
            [data, dataRole] = await Promise.all([
                jobService.getJobSpecById(req.params.id),
                jobService.getRoleResponsibilityById(req.params.id)
            ]);
        } catch (e) {
            console.error(e);
        }

        const htmlContent: string = nunjucks.render('view-job-spec.html', { job: data, responsibilities: dataRole });

        const $ = cheerio.load(htmlContent);
        const websiteText = $('h2, th, td').map((i, element) => {
            const el = $(element);
            return el.text() + (el.attr('href') ? ' - Link: ' + el.attr('href') : '');
        }).get().join('').replace(/\//g, '');

        // Check if the audio file is in the cache
        let buffer: Buffer = cache.get(websiteText);
        if (buffer) {
            res.set({
                'Content-Type': 'audio/mpeg',
            }).send(buffer);
        } else {
            // If it's not, generate the audio file
            const mp3 = await openai.audio.speech.create({
                model: "tts-1",
                voice: "echo",
                input: websiteText,
            });

            buffer = Buffer.from(await mp3.arrayBuffer());

            // Store the audio file in the cache
            cache.put(websiteText, buffer, 60 * 60 * 1000);

            res.set({
                'Content-Type': 'audio/mpeg',
            }).send(buffer);
        }
    });
};
