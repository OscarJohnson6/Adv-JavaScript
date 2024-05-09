// An API with 3 different get urls.
const express = require("express");
const fs = require("fs");
const app = express();
const jsonResponse = [
    {name: "oscar", course: "Adv Javascript"},
    {name: "johnson", course: "Adv Javascript"},
    {name: "jimmy", course: "Extreme Javascript"}
];
const apiURL = "/api";

app.get(`${apiURL}/html`, (req, res) => res.send(`<h1>hello world</h1>`));
app.get(`${apiURL}/json`, (req, res) => res.json(jsonResponse));
app.get(`${apiURL}/file`, (req, res) => {
    fs.readFile('lab11.html', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).send("Error reading file");
        return;
    }

    res.send(`<html>${data}</html>`);
    });
});

app.listen(3000, () => console.log("Listening on port 3000..."));