const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getScreenById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const screen = await prisma.screen.findUnique({
      where: {
        id,
      },
      include: {
        screenings: true,
      },
    });
    res.status(200).json({ screen });
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
};

const createTicket = async (req, res) => {
  const { seatName, screeningId, customerId } = req.body
  try {
    const ticket = await prisma.ticket.create({
      data: {
        customer: {
          connect: {
            id: customerId,
          },
        },
        screening: {
          connect: {
            id: screeningId,
          },
        },
        seat: {
          connectOrCreate: {
            where: { seatName: seatName },
            create: { seatName: seatName }
          },
        },
      },
      include: {
        customer: true,
        screening: true,
        seat: true
      },
    })
    res.status(201).json({ ticket })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
};

module.exports = {
  getScreenById,
  createTicket
};
