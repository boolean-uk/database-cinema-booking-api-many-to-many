const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const getScreenById = async (req, res) => {
    const id = Number(req.params.id);

    const screen = await prisma.screen.findUnique({
        where: {
            id: id,
        },
        include: {
            screenings: true,
        },
    });
    res.json({ screen });
};

const createTicket = async (req, res) => {
    const { customerId, screeningId, seatName } = req.body;

    const ticket = await prisma.ticket.create({
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
            seat: {
                connectOrCreate: {
                    seatName: seatName,
                },
            },
        },
        include: {
            screening: true,
            customer: true,
            seat: true,
        },
    });
    res.status(201).json({ ticket });
};

module.exports = {
    createTicket,
    getScreenById,
};
