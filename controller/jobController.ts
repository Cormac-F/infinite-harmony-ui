import { Job } from "../model/job";
import { Login } from "../model/auth";
import { Request, Response, Application } from "express";
import { SessionData } from "express-session";
import { log } from "console";

const jobService = require("../service/jobService");
const authService = require("../service/authService");
const session = require("express-session");

interface CustomSessionData extends SessionData {
    isLoggedIn: boolean;
}

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
    }
}

module.exports = function(app: Application){
    app.get("/", async (req: Request, res: Response) => {
        let isLoggedIn: boolean = req.session.isLoggedIn;

        res.render("index", { isLoggedIn: req.session.isLoggedIn, title: "Home" });
    });

    app.post("/index", async (req: Request, res: Response) => {
        let isLoggedIn: boolean = req.session.isLoggedIn;

        res.redirect("job-roles");
    });

    app.get("/login", async (req: Request, res: Response) => {
        res.render("login");
    })

    app.get("/job-roles", async (req: Request, res: Response) => {
        let data: Job[] | undefined;
        let isLoggedIn: boolean = req.session.isLoggedIn;

        try {
            data = await jobService.getJobs();
            isLoggedIn = req.session.isLoggedIn;
        } catch (e) {
            console.error(e);
        }
        res.render("list-jobs", { job: data, isLoggedIn: req.session.isLoggedIn } );
    });

    app.get ("/list-jobs/:id", async (req: Request, res: Response) => {
        let data: Job;
        let isLoggedIn: boolean = req.session.isLoggedIn;

        try {
            data = await jobService.getJobSpecById(req.params.id);
            isLoggedIn = req.session.isLoggedIn;
        } catch (e) {
            console.error(e);
        }
        res.render("view-job-spec", { job: data, isLoggedIn: req.session.isLoggedIn } );
    });
};

