const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { customerId, screeningId, seatNumber } = req.body;

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
      seats: {
        create: {
          seatNumber: seatNumber,
        },
      },
    },
    include: {
      screening: true,
      customer: true,
      seats: true,
    },
  });
  res.status(201).json({ ticket });
};
module.exports = {
  createTicket,
};
