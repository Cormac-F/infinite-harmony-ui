import { Job } from "../model/job";
import { Request, Response, Application } from "express";

const jobService = require("../service/jobService");

module.exports = function(app: Application){
    app.get("/job-roles", async (req: Request, res: Response) => {
        let data: Job[] | undefined;

        try {
            data = await jobService.getJobs();
        } catch (e) {
            console.error(e);
        }

        res.render("list-jobs", { job: data } );
    });
};