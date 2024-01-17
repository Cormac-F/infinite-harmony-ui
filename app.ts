import { Application, Request, Response } from "express";
import { env } from "process";
import { Job } from "./model/job";
import { Capability } from "./model/capability";
import config from "./config";
import * as dotenv from 'dotenv';
import OpenAI from "openai";
import cheerio from 'cheerio';

dotenv.config();

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const openai = new OpenAI();


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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: config.APP_SECRET_KEY, 
    cookie: { maxAge: 1800000 },
    resave: false,
    saveUninitialized: true
}));

app.use(session({ 
    secret: config.APP_SECRET_KEY, 
    cookie: { maxAge: 1800000 },
    resave: false,
    saveUninitialized: false
}));

declare module "express-session" {
    interface SessionData {
        job: Job;
        capability: Capability;
        token: string;
        isLoggedIn: boolean;
    }
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", async (req: Request, res: Response) => {
    const isLoggedIn: boolean = req.session.isLoggedIn;

    res.render("index", { isLoggedIn, title: "Home" });
});

require("./controller/jobController")(app);
require("./controller/capabilityController")(app);
require("./controller/authController")(app);
require("./controller/ttsController")(app);
