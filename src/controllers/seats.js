const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getAllSeats = async (req, res) => {
  const seats = await prisma.seat.findMany()
  return res.json({seats})
}

const createSeat = async (req, res) => {
  const { row, column } = req.body

  if(!row || !column) {
    return res.status(409).json({error: 'Missing field in request body'})
  }

  const seat = await prisma.seat.create({
    data: {
      row,
      column
    }
  })
  return res.status(201).json({seat})
}

const getSeatById = async (req, res) => {
  const id = Number(req.params.id)
  const seat = await prisma.seat.findUnique({
    where: {
      id: id
    }
  })
  if(seat === null) {
    return res.status(404).json({error: "No seat with that ID exists"})
  } 

  return res.json({seat})
}

const updateSeat = async (req, res) => {
  const { row, column } = req.body

  const id = Number(req.params.id)
  const seat = await prisma.seat.update({
    where: {
      id: id
    },
    data: {
      row,
      column
    }
  })
  return res.status(201).json({seat})
}

const deleteSeat = async (req, res) => {
  const id = Number(req.params.id)
  const seat = await prisma.seat.delete({
    where: {
      id: id
    }
  })

  return res.status(201).json({seat})

}

module.exports = {
  getAllSeats,
  createSeat,
  getSeatById,
  updateSeat,
  deleteSeat
}