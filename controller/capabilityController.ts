import { Capability } from "../model/capability";
import { Job } from "../model/job";
import { Request, Response, Application } from "express";

const capabilityService = require("../service/capabilityService");


module.exports = function(app: Application){

    app.get("/capability", async (req: Request, res: Response) => {
        let data: Capability[];

        try {
            data = await capabilityService.getAllCapabilities()
        } catch (e) {
            console.error(e);
        }
        res.render("list-capabilities", { capability: data } )
    });

    app.get("/edit-capability/:id", async (req: Request, res: Response) => {
        let data: Capability;

        try {
            data = await capabilityService.getCapabilityById(req.params.id);
            req.session.capability = data
        } catch (e) {
            console.error(e);
        }
        res.render("edit-capability", { capability: data } );
    });

    app.get("/edit-capability", async (req: Request, res: Response) => {
        if (!req.session.capability) {
            req.session.capability = {}
        }
        res.render("edit-capability")
    })

    app.post("/edit-capability", async (req: Request, res: Response) => {
        req.session.capability["capabilityName"] = req.body.capabilityName

        res.redirect("/confirm-edit-capability")
    })

    app.get("/confirm-edit-capability", async( req: Request, res: Response) => {
        res.render("confirm-edit-capability", req.session.capability)
    })

    app.post("/confirm-edit-capability", async (req: Request, res: Response) => {
        let data: Capability = req.session.capability
        let id: Number

        try{
            id = await capabilityService.updateCapability(data)

            req.session.capability = undefined

            res.redirect("/capability")
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render("confirm-edit-capability", req.session.capability)
        }
    })
}