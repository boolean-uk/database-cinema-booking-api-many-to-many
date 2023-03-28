const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getScreenInfo = async (req, res) => {
  const screenId = Number(req.params.id);

  const data = {
    where: {
      id: screenId,
    },
    include: {
      screenings: {
        include: {
          seats: true,
        },
      },
    },
  };

  try {
    const screen = await prisma.screen.findUnique(data);
    res.json({ screen });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({ error: e.message });
    }
  }
};

// req.body
// {
//     customer.id,
//     screeningId,
//     seatId,
// }
const createNewTicket = async (req, res) => {
  const body = req.body;

  const data = {
    data: {
      screening: {
        connect: {
          id: Number(body.screeningId),
        },
      },
      customer: {
        connect: {
          id: Number(body.customerId),
        },
      },
      seat: {
        connect: {
          id: Number(body.seatId),
        },
      },
    },
    include: {
      screening: true,
      seat: true,
      customer: true,
    },
  };

  try {
    const ticket = await prisma.ticket.create(data);
    res.status(201).json({ ticket });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({ error: e.message });
    }
    res.status(500).json({ error: e.message });
    console.log(e.message);
  }
};

module.exports = {
  getScreenInfo,
  createNewTicket,
};
