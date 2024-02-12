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

//const seatsTicketsRouter = require(`../Router/seatsticket`)
//app.use(`/seatsTickets`, seatsTicketsRouter)


const seatsTicketsRouter = require('../Router/seatsticket');
const ticketsRouter = require('../Router/ticketsRouter')

app.use('/seatsTickets', seatsTicketsRouter);
app.use('/tickets', ticketsRouter);


module.exports = app
