const prisma = require('../utils/prisma')

const getScreenById = async (req, res) => {
    const screenId = Number(req.params.id)

    const screen = await prisma.screen.findUnique({
        where: {
            id: screenId,
        },
        include: {
            screenings: true,
        }
    })
    res.json({ screen })
}


// ticket -> screeningId, customerId, seatNumber
const createNewTicket = async (req, res) => {
    const { screeningId, customerId, seatNumber } = req.body;

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
            seat: {
                connect: {
                    seatNumber: seatNumber
                }
            }
        },
        include: {
            screening: true,
            customer: true,
            seat: true
        }
    })
    res.json({ ticket })
}

module.exports = {
    getScreenById,
    createNewTicket
}