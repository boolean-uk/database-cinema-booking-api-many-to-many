// DB
const { getTicketsByScreenIdDb } = require('../domains/ticketDomain')

const getTicketsByScreenId = async (req, res, next) => {
  const { id } = req.params

  try {
    const foundTickets = await getTicketsByScreenIdDb(id)

    res.status(200).json({ tickets: foundTickets })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = { getTicketsByScreenId }
