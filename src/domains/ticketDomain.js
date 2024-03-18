const prisma = require('../utils/prisma')

const getSeatsByScreenIdDb = async (id) => {
  const foundSeats = await prisma.seat.findMany({
    where: {
      screenId: Number(id)
    }
  })

  return foundSeats
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

module.exports = { getSeatsByScreenIdDb, createTicketDb }
