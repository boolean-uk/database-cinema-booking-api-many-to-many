const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getSeats = async(id, res) => {
    const result = await prisma._screeningToSeat.findUnique({
        where: {
            id
        },
        

    })
}