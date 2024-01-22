const prisma = require('../utils/prisma')

const getSeatsDb = async (screenId) => await prisma.seat.findMany({
    where: { screenId: screenId }
})

module.exports = { getSeatsDb }