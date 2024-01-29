const express = require("express");
const { getSeatById, createTicket } = require("../controller/seatsTickets");

const router = express.Router();

router.get("/:id", getSeatsById);
router.post('/', createTicket)

module.exports = router;