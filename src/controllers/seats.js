const prisma = require('../utils/prisma')
const { Prisma } = require('@prisma/client')

const getSeats = async (req, res) => {
  const { id } = Number(req.params)
  const seats = await prisma.seat.findMany({
    where: {
      screenId: id
    },
    include: { screens: true }
  })
  res.status(200).json({ seats: seats })
}
module.exports = {
  getSeats
}
