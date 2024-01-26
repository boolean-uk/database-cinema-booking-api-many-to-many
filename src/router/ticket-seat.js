const express = require("express")
const { getTicketsWithSeatsForAScreen, createTicketWithSeats } = require("../controller/ticket-seat")
const router = express.Router()
router.get("/screens/:id",  getTicketsWithSeatsForAScreen) // scrren id 
router.post("/tickets", createTicketWithSeats) // create new ticket 
module.exports = router