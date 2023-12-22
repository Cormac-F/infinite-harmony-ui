import { Application, Request, Response } from "express";
import { env } from "process";
import config from "./config"

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const app = express();
const session = require("express-session");

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

app.use(session({secret: process.env.APP_SECRET_KEY || config.secretKey, cookie: { maxAge: 60000 }}));

declare module "express-session" {
    interface SessionData {
        token: string;
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