const prisma = require("./utils/prisma");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getScreenById(req, res) {
  const id = Number(req.params.id);
  const screen = await prisma.screen.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      screenings: {
        include: {
          movie: true,
          tickets: {
            include: {
              seats: true,
            },
          },
        },
      },
    },
  });

  res.json({ screen });
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createTicket(req, res) {
  const { customerId, screeningId } = req.body;
  const seats = req.body.seatIds.map((seatId) => ({ seatId }));

  const ticket = await prisma.ticket.create({
    data: {
      customerId,
      screeningId,
      seats: {
        create: seats,
      },
    },
    include: {
      screening: {
        include: {
          movie: true,
        },
      },
      seats: true,
    },
  });

  res.status(201).json({ ticket });
}

module.exports = {
  getScreenById,
  createTicket,
};
