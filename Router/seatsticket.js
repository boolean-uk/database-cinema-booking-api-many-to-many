const express = require("express");
const { getSeatById, createTicket } = require("../Controller/seatsTicket");

const router = express.Router();

// Route to get a seat by id
 router.get("/:id", getSeatById);
 
 // Route to create a new ticket
 router.post('/', createTicket)



module.exports = router;