const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const screenRouter = require("../src/router/screen.js");
const ticketRouter = require("../src/router/ticket.js");

app.disable("x-powered-by");

// Add middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your router below
app.use("/screens", screenRouter);
app.use("/tickets", ticketRouter);

module.exports = app;
