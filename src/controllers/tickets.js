const prisma = require("../utils/prisma");
const { Prisma } = require("@prisma/client");

const createTicket = async (req, res) => {
  const { customerId, screeningId, seatNumbers } = req.body;

  try {
    const existingSeats = await prisma.seatTicket.findMany({
      where: {
        seat: {
          screenId: screeningId,
          seatNumber: { in: seatNumbers },
        },
        ticket: {
          screeningId: screeningId,
        },
      },
    });

    if (existingSeats.length > 0) {
      return res
        .status(409)
        .json({ error: "Seats already booked." });
    }
    const ticket = await prisma.ticket.create({
      data: {
        screening: { connect: { id: screeningId } },
        customer: { connect: { id: customerId } },
        seats: {
          createMany: {
            data: seatNumbers.map((seatNumber) => ({
              seat: {
                connect: { screenId: screeningId, seatNumber: seatNumber },
              },
            })),
          },
        },
      },
      include: {
        screening: true,
        customer: true,
        seats: {
          include: {
            seat: true,
          },
        },
      },
    });

    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTicket,
};