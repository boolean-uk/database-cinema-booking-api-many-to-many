const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// Add middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Add your router below
const ticketRouter = require("./routers/index");
app.use("/tickets", ticketRouter);

const screenRouter = require("./routers/index");
app.use("/screens", screenRouter);


module.exports = app
