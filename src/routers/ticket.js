const express = require("express");

const { createTicket } = require('../controllers/ticket.js')

const router = express.Router();

router.post("/", createTicket);

module.exports = router;