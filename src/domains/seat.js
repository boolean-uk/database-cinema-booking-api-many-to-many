const prisma = require('../utils/prisma')

const getSeatsDb = async (screenId) => await prisma.seat.findMany({
    where: { screenId }
})

const createTicketDb = async (screeningId, customerId, seatId) => await prisma.ticket.create({
    data: {
        screeningId,
        customerId,
        seats: {
            connect: {
                id: seatId
            }
        }
    },
    include: {
        seats: true
    }
})

module.exports = { getSeatsDb, createTicketDb }