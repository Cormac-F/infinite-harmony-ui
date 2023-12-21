import { Job } from "../model/job";
import { Responsibility } from "../model/responsibility";
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

    app.get("/list-jobs/:id", async (req: Request, res: Response) => {
        let data: Job;
        let data2: Responsibility[];

        try {
            data = await jobService.getJobSpecById(req.params.id);
            data2 = await jobService.getRoleResponsibilityById(req.params.id);
        } catch (e) {
            console.error(e);
        }
  
        res.render("view-job-spec", { job: data, responsibilities: data2 } );
    });
};