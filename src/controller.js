const { Prisma } = require("@prisma/client");
const prisma = require("./utils/prisma");

const retrieveScreenById = async (req, res) => {
  const screen = await prisma.screen.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      screenings: true,
    },
  });
  res.json({ screen });
};

const createTicket = async (req, res) => {
  const { screeningId, customerId, seatNumber } = req.body;

  //   Example request body:
  //
  // {
  //   "screeningId": 1,
  //   "customerId": 1,
  //   "seatNumber": "A10"
  // }

  const createdTicket = await prisma.ticket.create({
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
      seats: {
        connectOrCreate: {
          number: seatNumber,
        },
      },
    },
    include: {
      screening: true,
      customer: true,
      seats: true,
    },
  });
  res.status(201).json({ ticket: createdTicket });
};

module.exports = {
  retrieveScreenById,
  createTicket,
};
