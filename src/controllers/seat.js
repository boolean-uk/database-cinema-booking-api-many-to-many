const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getSeatsByScreenId = async (req, res) => {
    const { id } = req.params;

    const seats = await prisma.seat.findMany({
        where: {
            screenId: Number.parseInt(id)
        }
    })

    res.status(201).json({Seats: seats})
}

module.exports = {
    getSeatsByScreenId
}