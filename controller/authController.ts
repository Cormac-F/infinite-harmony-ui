import { Request, Response, Application } from "express";
import { Login } from "../model/auth";
import { SessionData } from "express-session";

const authService = require("../service/authService");
const session = require("express-session");

interface CustomSessionData extends SessionData {
    isLoggedIn: boolean;
};

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
    }
};

module.exports = function(app: Application) {
    app.post("/login", async (req: Request, res: Response) => {
        const data: Login = req.body;

        try {
            req.session.token = await authService.login(data);
            req.session.isLoggedIn = true;
            res.redirect("/job-roles");
        } catch (e) {
            console.error(e);
            res.locals.errormessage = e.message;
            res.render("login", req.body);
        }
    });

    app.get("/logout", async (req: Request, res: Response) => {
        req.session.destroy((err: Error) => {
            if (err) {
                console.error(err);
            }
        });
        res.redirect("/");
    });
};
