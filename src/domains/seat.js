const prisma = require('../utils/prisma')

const getSeatsDb = async (screenId) => await prisma.seat.findMany({
    where: { screenId }
})

const createTicketDb = async (screeningId, customerId, seats) => await prisma.ticket.create({
    data: {
        screeningId,
        customerId,
        seats: { connect: seats }
    },
    include: {
        seats: true
    }
})

module.exports = { getSeatsDb, createTicketDb }