const express = require("express")
const { getTicketsWithSeatsForAScreen, createTicketWithSeats } = require("../controllers/tickets_and_seats")
const router = express.Router()

// Add a route to get a list of records for the new model for a particular screen, using a screenId parameter
router.get("/screens/:id",  getTicketsWithSeatsForAScreen)
// Add a route to create a new ticket with relations to the new model
router.post("/tickets", createTicketWithSeats)
// createTicketWithSeats()

module.exports = router