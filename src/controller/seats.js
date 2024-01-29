const prisma = require("../utils/prisma");

const getSeatsById = async (req, res) => {
  const id = Number(req.params.id);

  const seats = await prisma.seat.findMany({
    where: {
      screening: {
        some: {
          screenId: id,
        },
      },
    },
  });
  res.json(seats);
};

module.exports = {
  getSeatsById,
};