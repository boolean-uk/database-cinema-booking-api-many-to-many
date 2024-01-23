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

const createTicketDb = async (customerId, screeningId, seatsArray) => {
  const createdTicket = await prisma.ticket.create({
    data: {
      screening: {
        connect: {
          id: Number(screeningId)
        }
      },
      customer: {
        connect: {
          id: Number(customerId)
        }
      },
      seats: {
        create: seatsArray.map((seatId) => ({
          seat: {
            connect: {
              id: seatId
            }
          }
        }))
      }
    },
    include: {
      screening: {
        select: {
          movie: {
            select: {
              title: true
            }
          }
        }
      },
      customer: {
        select: {
          name: true
        }
      },
      seats: true
    }
  })

  return createdTicket
}

module.exports = { getTicketsByScreenIdDb, createTicketDb }
