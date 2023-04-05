const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getScreen = async (req, res) => {
  const id = Number(req.params.id);
  const screen = await prisma.screen.findUnique({
    where: {
      id: id,
    },
    include: {
      seats: true,
    },
  });
  if (!screen) {
    return res.status(404).json({ error: "movie with this id not found" });
  }
  return res.status(200).json({ screen });
};

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  const seats = req.body.seats;
  // console.log(seats)
  
  const createdTicket = await prisma.ticket.create({
    data: {
      screening: {
        connect: {
          id: Number(screeningId),
        },
      },
      customer: {
        connect: {
          id: Number(customerId),
        },
      },
      seats: {
        connect: seats.map((seatId) => ({ id: seatId })),
      },
    },
    include: {
      customer: true,
      screening: true,
      seats: true,
    },
  });
  return res.status(201).json({ ticket: createdTicket });
};

module.exports = {
  getScreen,
  createTicket,
};
