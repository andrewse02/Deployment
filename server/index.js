require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
    accessToken: "352a1b28ed2246428a98dac848c9e011",
    captureUncaught: true,
    captureUnhandledRejections: true
});

rollbar.log("Hello world!");

app.use(express.static(path.join(__dirname, "/../client")));

const port = process.env.PORT || 4005;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/error", (req, res) => {
    try {
        error("This won't work.");
    } catch (error) {
        console.error(error);
        rollbar.error(error);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
