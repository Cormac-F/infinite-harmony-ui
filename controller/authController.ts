import { Request, Response, Application } from "express";
import { Login } from "../model/auth";

const authService = require("../service/authService");
const session = require("express-session");

module.exports = function(app: Application) {
    app.get("/login", async (req: Request, res: Response) => {
        res.render("login");
    });

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
