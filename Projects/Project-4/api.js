// Creating a server to say hello world on port 3333.
const express = require("express");
const Database = require("./Database.js");
const cors = require('cors');
const app = express();
const API_URL= "/api/tasks";
const db = new Database();

app.use(express.json());
app.use(cors());

app.get(`${API_URL}`, (req, res) => db.allTasks(databaseData => res.json(databaseData)));

app.get(`${API_URL}/:id`, (req, res) => db.getTaskById(req.params.id, databaseData => res.json(databaseData)));

app.post(`${API_URL}/:id/:description`, (req, res) => db.addTask(req.params.id, req.params.description,  databaseData => res.json(databaseData)));

app.delete(`${API_URL}/:id/:description`, (req, res) => db.deleteTask(req.params.id, req.params.description,  databaseData => res.json(databaseData)));

app.listen(3333, () => console.log("Listening on port 3333..."));
