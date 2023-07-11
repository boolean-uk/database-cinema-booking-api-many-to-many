const prisma = require("../utils/prisma");

const getScreenById = async (req, res) => {
  const screenId = Number(req.params.id);

  const screen = await prisma.screen.findUnique({
    where: {
      id: screenId,
    },
    include: {
      screenings: true,
    },
  });
  res.json({ screen });
};

const createNewTicket = async (req, res) => {
  const { screeningId, customerId, seatNum } = req.body;

  const ticket = await prisma.ticket.create({
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
      seat: {
        connect: {
          seatNum: seatNum,
        },
      },
    },
    include: {
      screening: true,
      customer: true,
      seat: true,
    },
  });
  res.json({ ticket });
};

module.exports = {
  getScreenById,
  createNewTicket,
};
