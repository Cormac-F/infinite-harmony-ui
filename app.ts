import { Application, Request, Response } from "express";
import { env } from "process";
import { Job } from "./model/job";
import { Capability } from "./model/capability";
import config from "./config";
import * as dotenv from 'dotenv';

dotenv.config();

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");

// Nunjucks Configuration
const appViews = path.join(__dirname, "/views/");

function setUpNunjucks(expressApp: Application) {

    const env = nunjucks.configure("views", {
        autoescape: true,
        express: app
    });
  }
  
setUpNunjucks(express);

// Express Configuration
app.set("view engine", "html");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(session({ 
    secret: config.APP_SECRET_KEY, 
    cookie: { maxAge: 1800000 },
    resave: false,
    saveUninitialized: false
}));

declare module "express-session" {
    interface SessionData {
        job: Job
        capability: Capability
    }
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Express Routes
app.get("/", async (req: Request, res: Response) => {
    res.render("index", { title: "Home" });
});

require("./controller/jobController")(app);
require("./controller/capabilityController")(app);