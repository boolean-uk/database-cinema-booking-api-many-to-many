const { getTicketsWithSeatsForAScreenDb } = require("../domains.js/tickets")

const getTicketsWithSeatsForAScreen = async (req, res) => {
    const screenWithTickets = await getTicketsWithSeatsForAScreenDb(Number(req.params.id))
    res.json({ screenWithTickets })
}
const createTicketWithSeats = async () => {
    res.status(201).json({ ticket })    
}

module.exports = {
    getTicketsWithSeatsForAScreen,
    createTicketWithSeats
}