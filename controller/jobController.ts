import { Capability } from "../model/capability";
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

    app.get("/capability", async (req: Request, res: Response) => {
        let data: Job[];

        try {
            data = await jobService.getAllCapabilities()
        } catch (e) {
            console.error(e);
        }
        res.render("list-capabilities", { job: data } )
    });

    app.get("/list-capabilities/:id",async (req: Request, res: Response) => {
        let data: Capability;

        try {
            data = await jobService.getCapabilityById(req.params.id);
            console.log(req.params.id)
        } catch (e) {
            console.error(e);
        }
        res.render("edit-capability", { capability: data} );
    });

    app.get("/edit-capability", async (req: Request, res: Response) => {
        if (!req.session.job) {
            req.session.job = {}
        }
        res.render("edit-capability")
    })

    app.put("/edit-capability", async (req: Request, res: Response) => {
        let data: Capability = req.body
        let id: Number

        try{
            id = await jobService.updateCapability(data)

            res.redirect("/confirm-edit-capability")
        }catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render("edit-capability", req.body)
        }
    })
    
    app.get("/confirm-edit-capability", async( req: Request, res: Response) => {
        res.render("confirm-edit-capability", req.session.job)
    })

    app.put("/confirm-edit-capability", async (req: Request, res: Response) => {
        let data: Job = req.session.job
        let id: Number

        try{
            id = await jobService.updateCapability(data)

            req.session.job = undefined

            res.redirect("/list-capabilities")
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render("confirm-edit-capability", req.session.job)
        }
    })
}