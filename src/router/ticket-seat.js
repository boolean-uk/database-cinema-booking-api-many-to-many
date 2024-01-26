const express = require("express")
const { getTicketsWithSeatsForAScreen, createTicketWithSeats } = require("../controller/ticket-seat")
const router = express.Router()
router.get("/screens/:id",  getTicketsWithSeatsForAScreen)
router.post("/tickets", createTicketWithSeats)
module.exports = router