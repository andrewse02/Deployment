require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
    accessToken: process.env.ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
});

rollbar.log("Hello world!");

app.use(express.static(path.join(__dirname, "/../client")));

const port = process.env.PORT || 4005;

app.get("/", (req, res) => {
    const ip = req.socket.remoteAddress;
    console.log(ip);

    res.sendFile(path.join(__dirname, "../client/home.html"));
});

app.get("/error", (req, res) => {
    try {
        error("This won't work.");
    } catch (error) {
        rollbar.critical(error, "Function does not exist!");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
