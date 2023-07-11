const prisma = require('../utils/prisma')
const { Prisma } = require('@prisma/client')

const createTicket = async (req, res) => {
  const { customerId, screeningId, seatNumber } = req.body

  try {
    const ticket = await prisma.ticket.create({
      data: {
        screening: {
          connect: {
            id: screeningId
          }
        },
        customer: {
          connect: {
            id: customerId
          }
        },
        seats: {
          create: {
            seatNumber: seatNumber
          }
        }
      },
      include: {
        screening: true,
        customer: true,
        seats: true
      }
    })
    res.status(201).json({ ticket })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A seat with the provided number already exists' })
      }
    }
    res.status(500).json({ error: error.message })
  }
}
module.exports = {
  createTicket
}
