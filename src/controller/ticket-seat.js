const { getTicketsWithSeatsForAScreenDb, createTicketWithSeatsDb } = require("../domains.js/tickets_and_seats")

const getTicketsWithSeatsForAScreen = async (req, res) => {
    const ticketsForAScreen = await getTicketsWithSeatsForAScreenDb(Number(req.params.id))

    res.json({ ticketsForAScreen })

}

const createTicketWithSeats = async (req, res) => {
    const request = req.body
    const ticket = await createTicketWithSeatsDb(request)
    res.status(201).json({ ticket })    

}

module.exports = {
    getTicketsWithSeatsForAScreen,
    createTicketWithSeats

}