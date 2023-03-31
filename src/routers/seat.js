const express = require("express");
const { createTicket } = require("../controllers/index");

const router = express.Router();

router.post("/", createSeat);

module.exports = router;
