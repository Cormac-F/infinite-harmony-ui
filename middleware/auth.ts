import { NextFunction, Request, Response } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
    if (req.session.token && req.session.token.length > 0 ) {
        next();
    } else {
        res.redirect("/login")
    }
}