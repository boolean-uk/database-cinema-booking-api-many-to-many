const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllInfo = async (req, res) => {
  const screenId = Number(req.params.id);
  const getAllInfo = await prisma.screen.findUnique({
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
  });

  res.json({ info: getAllInfo });
};

const getSeats = async (req, res) => {
  const getSeats = await prisma.seat.findMany();
  res.json({ seats: getSeats });
};

const createTicket = async (req, res) => {
  const { screeningId, customerId, seatId } = req.body;
  if (!screeningId || !customerId || !seatId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  } else {
    const findCustomer = await prisma.customer.findFirst({
      where: { id: customerId },
    });
    if (!findCustomer) {
      return res.status(404).json({
        error: "Customer with that id does not exist",
      });
    } else {
      const findSeat = await prisma.seat.findFirst({
        where: { id: seatId },
      });

      if (!findSeat) {
        return res.status(404).json({
          error: "Seat with that id does not exist",
        });
      }
      const createTicket = await prisma.ticket.create({
        data: {
          screeningId,
          customerId,
          seatId,
        },
        include: {
          screening: true,
          screening: {
            include: {
              movie: true,
              screen: true,
            },
          },
          seat: true,
        },
      });
      res.status(201).json({ ticket: createTicket });
    }
  }
};

module.exports = {
  getAllInfo,
  getSeats,
  createTicket,
};
