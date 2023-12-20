import { Job } from "../model/job";
import { Request, Response, Application } from "express";

const jobService = require("../service/jobService");

module.exports = function(app: Application){
    app.post("/index", async (req: Request, res: Response) => {
        res.redirect("job-roles");
    });

    app.get("/job-roles", async (req: Request, res: Response) => {
        let data: Job[] | undefined;

        try {
            data = await jobService.getJobs();
        } catch (e) {
            console.error(e);
        }
        
        res.render("list-jobs", { job: data } );
    });

    app.get ("/list-jobs/:id", async (req: Request, res: Response) => {
        let data: Job;

        try {
            data = await jobService.getJobSpecById(req.params.id);
        } catch (e) {
            console.error(e);
        }
        res.render("view-job-spec", { job: data } );
    });
};