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
  const {
    screeningId,
    customerId,
    seats: [number],
  } = req.body;

  const screening = await prisma.screening.findFirst({
    where: {
      id: screeningId,
    },
  });

  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
    },
  });

  const seats = await prisma.seat.findFirst({
    where: {
      number,
    },
  });

  if (!screeningId || !customerId || !seats) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  if (customer && screening && seats) {
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
          connect: { id: number },
        },
      },
      include: {
        customer: true,
        screening: true,
        seats: true,
      },
    });
    return res.status(201).json({ ticket: createdTicket });
  } else {
    res.status(404).json({
      error: "A customer or screening does not exist with the provided id.",
    });
  }
};

module.exports = {
  getScreen,
  createTicket,
};
