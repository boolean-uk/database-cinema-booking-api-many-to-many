const prisma = require("../utils/prisma.js");

const createTicketDB = async (screeningId, customerId, seats) =>
    await prisma.ticket.create({
        data: {
            screeningId,
            customerId,
            seats: {
                connect: seats,
            },
        },
        include: {
            screening: {
                include: {
                    screen: true,
                    movie: true,
                },
            },
            customer: true,
            seats: true,
        },
    });

module.exports = {
    createTicketDB,
};
