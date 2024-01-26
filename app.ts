import { Application, Request, Response } from "express";
import { Job } from "./model/job";
import { Capability } from "./model/capability";
import config from "./config";
import * as dotenv from "dotenv";
import { Socket } from "socket.io";
import * as http from "http";

dotenv.config();

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const app = express();
const PORT = 3000;
const session = require("express-session");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = require("socket.io")(server);

// Nunjucks Configuration
const appViews = path.join(__dirname, "/views/");

function setUpNunjucks(expressApp: Application) {
  const env = nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });
}

setUpNunjucks(express);

// Express Configuration
app.set("view engine", "njk");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.APP_SECRET_KEY,
    cookie: { maxAge: 1800000 },
    resave: false,
    saveUninitialized: true,
  }),
);

declare module "express-session" {
  interface SessionData {
    job: Job;
    capability: Capability;
    token: string;
    isLoggedIn: boolean;
  }
}

io.on("connection", (socket: any) => {
  console.log("A user connected");

  // You can handle additional Socket.IO events here if needed

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", async (req: Request, res: Response) => {
  const isLoggedIn: boolean = req.session.isLoggedIn;

  res.render("index", { isLoggedIn, title: "Home", chatHistory: [] });
});

require("./controller/jobController")(app);
require("./controller/capabilityController")(app);
require("./controller/authController")(app);
require("./controller/ttsController")(app);
require("./controller/botController")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
