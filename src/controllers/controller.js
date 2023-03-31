const { prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getScreenById = async (req, res) => {
  const screenId = Number(req.params.id);

  const data = {
    where: {
      id: screenId,
    },
    include: {
      screenings: true,
      seats: true,
    },
  };
};

const createTicket = async (req, res) => {
  const body = req.body;
  const seats = body.seats

  const ticket = await prisma.ticket.create({
    data: {
      customer: {
        connect: {
          id: Number(body.customerId),
        },
      },
      screening: {
        connect: {
          id: Number(body.screeningId),
        },
      },
      seat: {
        connect: [{
          seats
        }]
        
      },
    },
  });
  res.status(201).json{ ticket};
};

module.exports = {
  getScreenById,
  createTicket,
};
