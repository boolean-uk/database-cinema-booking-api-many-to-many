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

const screenRouter = require('./routers/screen.js')
app.use('/screens', screenRouter)

module.exports = app
