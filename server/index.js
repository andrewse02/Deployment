const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 4005;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});