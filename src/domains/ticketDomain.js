const prisma = require('../utils/prisma')

const getTicketsByScreenIdDb = async (id) => {
  const foundTickets = await prisma.ticket.findMany({
    where: {
      seats: {
        some: {
          seat: {
            screenId: Number(id)
          }
        }
      }
    },
    include: {
      seats: true
    }
  })

  return foundTickets
}

module.exports = { getTicketsByScreenIdDb }
