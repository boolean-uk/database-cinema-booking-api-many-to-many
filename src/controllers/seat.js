const { getSeatsDb, createTicketDb } = require('../domains/seat.js')

const getSeats = async (req, res) => {
    const screenId = Number(req.params.screenId)
    const seats = await getSeatsDb(screenId)
    res.status(201).json({ seats })
}

const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body
    const screenId = Number(req.params.screenId)
    const seats = await getSeatsDb(screenId)
    const ticket = await createTicketDb(screeningId, customerId, seats)
    res.status(200).json({ ticket })
}

module.exports = { getSeats, createTicket }