const { createTicketDB } = require("../domains/ticket.js");

const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body
    const createdTicket = await createTicketDB(screeningId, customerId);
    res.status(201).json({ ticket: createdTicket });
};

module.exports = {
    createTicket,
};
