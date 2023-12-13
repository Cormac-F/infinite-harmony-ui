import { Application, Request, Response } from "express";
import { Job } from "../model/job";
import { Responsibility } from "../model/responsibility";

const jobService = require('../service/jobService');

module.exports = function(app: Application){

    app.get('/list-jobs/:id', async (req: Request, res: Response) => {
        let data: Job
        let data2: Responsibility[]

        try {
            data = await jobService.getJobSpecById(req.params.id);
            data2 = await jobService.getRoleResponsibilityById(req.params.id);
        } catch (e) {
            console.error(e);
        }

        res.render('view-job-spec', { job: data, responsibilities: data2 } )
    })
}