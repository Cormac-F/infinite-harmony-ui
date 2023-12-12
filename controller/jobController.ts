import { Application, Request, Response } from "express";
import { Job } from "../model/job";

const jobService = require('../service/jobService');

module.exports = function(app: Application){

    app.get('/list-jobs/:id', async (req: Request, res: Response) => {
        let data: Job

        try {
            data = await jobService.getJobSpecById(req.params.id);
        } catch (e) {
            console.error(e);
        }

        res.render('view-job-spec', { job: data } )
    })
}