import { Request, Response, Application } from "express";
import { Login } from "../model/auth";
import { SessionData } from "express-session";

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

module.exports = function(app: Application) {
    app.get("/login", async (req: Request, res: Response) => {
        req.session.isLoggedIn = true
        res.render("login");
    })

    app.post("/login", async (req: Request, res: Response) => {
        let data: Login = req.body;

        try {
            req.session.token = await authService.login(data);

            res.redirect("/job-roles");
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            res.render("login", req.body);
        }
    })
}
