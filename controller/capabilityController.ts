import { Capability } from "../model/capability";
import { Request, Response, Application } from "express";

const capabilityService = require("../service/capabilityService");

module.exports = function(app: Application){
    app.get("/capability", async (req: Request, res: Response) => {
        let data: Capability[];
        const isLoggedIn: boolean = req.session.isLoggedIn;

        try {
            data = await capabilityService.getAllCapabilities();
        } catch (e) {
            console.error(e);
        }
        res.render("list-capabilities", { capability: data, isLoggedIn } );
    });

    app.get("/edit-capability/:id", async (req: Request, res: Response) => {
        let data: Capability;
        const isLoggedIn: boolean = req.session.isLoggedIn;

        try {
            data = await capabilityService.getCapabilityById(req.params.id);
            req.session.capability = data;
        } catch (e) {
            console.error(e);
        }
        res.render("edit-capability", { capability: data, isLoggedIn } );
    });

    app.post("/edit-capability", async (req: Request, res: Response) => {
        req.session.capability["capabilityName"] = req.body.capabilityName;
        const isLoggedIn: boolean = req.session.isLoggedIn;

        res.redirect("/confirm-edit-capability");
    });

    app.get("/confirm-edit-capability", async( req: Request, res: Response) => {
        res.render("confirm-edit-capability", req.session.capability);
    });

    app.post("/confirm-edit-capability", async (req: Request, res: Response) => {
        const data: Capability = req.session.capability;
        let id: number;
        const isLoggedIn: boolean = req.session.isLoggedIn;

        try{
            id = await capabilityService.updateCapability(data);

            req.session.capability = undefined;

            res.redirect("/capability");
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            res.render("confirm-edit-capability", req.session.capability);
        }
    });
};