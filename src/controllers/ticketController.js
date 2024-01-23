// DB
const {
  getTicketsByScreenIdDb,
  createTicketDb
} = require('../domains/ticketDomain')

const getTicketsByScreenId = async (req, res, next) => {
  const { id } = req.params

  try {
    const foundTickets = await getTicketsByScreenIdDb(id)

    res.status(200).json({ tickets: foundTickets })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const createTicket = async (req, res, next) => {
  const { customerId, screeningId, seats } = req.body

  try {
    const createdTicket = await createTicketDb(customerId, screeningId, seats)

    res.status(201).json({ ticket: createdTicket })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = { getTicketsByScreenId, createTicket }
