const { createTicketDb } = require('../domains/ticket')

const createTicket = async (req, res) => {
    const { customerId, screeningId, seatNumber } = req.body
    const ticket = await createTicketDb(customerId, screeningId, seatNumber)
    res.status(201).json({ ticket: ticket })
}

module.exports = { createTicket }