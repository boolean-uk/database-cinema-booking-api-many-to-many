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

const seatsRouter = require('./router/seats')
app.use('/seats', seatsRouter)
const ticketsRouter = require('./router/tickets')
app.use('/tickets', ticketsRouter)

module.exports = app
