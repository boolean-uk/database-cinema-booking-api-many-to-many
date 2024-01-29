const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSeatById = async (req, res) => {
  try {
    const screenId = Number(req.params.id);

    const seats = await prisma.seat.findMany({
      where: {
        screening: {
          some: {
            screenId,
          },
        },
      },
    });

    res.json(seats);
  } catch (error) {
    console.error("An error occurred while fetching seats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTicket = async (req, res) => {
  try {
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
            seatNumber,
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
  } catch (error) {
    console.error("An error occurred while creating a ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getSeatById,
  createTicket
};
