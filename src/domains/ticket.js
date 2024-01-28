const prisma = require('../utils/prisma')

const createTicketDb = async (customerId, screeningId, seatNumber) => await prisma.ticket.create({
    data: {
        screening: {
            connect: {
                id: screeningId,
            },
        },
        customer: {
            connect: {
                id: customerId,
            },
        },
        seats: {
            create: {
                seatNumber: seatNumber,
            },
        },
    },
    include: {
        screening: true,
        customer: true,
        seats: true,
    }
})

module.exports = { createTicketDb }