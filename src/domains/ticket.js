const prisma = require("../utils/prisma.js");

const createTicketDB = async (screeningId, customerId) =>
    await prisma.ticket.create({
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
        },
        include: {
            screening: {
                include: {
                    screen: true,
                    movie: true,
                },
            },
            customer: true,
        },
    });

module.exports = {
    createTicketDB,
};
