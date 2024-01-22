const express = require("express");
const controller = require("./controller");

const app = express();

app.get("/screen/:id", controller.getScreenById);

module.exports = app;
