const prisma = require("../utils/prisma");

const seatsByScreenId = async (req, res) => {
  const screenId = Number(req.body.screenId);

  const seats = await prisma.seat.findMany({
    where: {
      screen: {
        every: {
          id: screenId
        }
      }
    }
  })
  res.send(seats);
};

module.exports = seatsByScreenId;
