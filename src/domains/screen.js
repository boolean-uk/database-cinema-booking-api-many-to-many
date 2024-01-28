const prisma = require('../utils/prisma')

const getScreenDb = async (id) => await prisma.screen.findUnique({
    where: {
        id: id
    },
    include: {
        seat: true
    }
})

module.exports = { getScreenDb }