const { createTicketDB } = require("../domains/ticket.js");

const createTicket = async (req, res) => {
    const { screeningId, customerId, seatIds } = req.body
    const seats = seatIds.map((seat) => ({id: seat}))

    const createdTicket = await createTicketDB(screeningId, customerId, seats);
    
    console.log(createdTicket)
    res.status(201).json({ ticket: createdTicket });
};

module.exports = {
    createTicket,
};
