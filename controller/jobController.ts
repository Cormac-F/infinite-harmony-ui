import { Job } from "../model/job";
import { Login } from "../model/auth";
import { Responsibility } from "../model/responsibility";
import { Request, Response, Application } from "express";
import { SessionData } from "express-session";

const jobService = require("../service/jobService");
const authService = require("../service/authService");
const session = require("express-session");

module.exports = function (app: Application) {
  app.get("/job-roles", async (req: Request, res: Response) => {
    let data: Job[] | undefined;
    const isLoggedIn: boolean = req.session.isLoggedIn;

    try {
      data = await jobService.getJobs();
    } catch (e) {
      console.error(e);
    }
    res.render("list-jobs", { job: data, isLoggedIn });
  });

  app.get("/list-jobs/:id", async (req: Request, res: Response) => {
    let data: Job;
    let dataRole: Responsibility[];
    const isLoggedIn: boolean = req.session.isLoggedIn;

    try {
      data = await jobService.getJobSpecById(req.params.id);
      dataRole = await jobService.getRoleResponsibilityById(req.params.id);
    } catch (e) {
      console.error(e);
    }
    res.render("view-job-spec", {
      job: data,
      responsibilities: dataRole,
      isLoggedIn,
    });
  });
};
