const prisma = require("../utils/prisma");

const seatsByScreenId = async (req, res) => {
  const screenId = req.body.screenId;
  const seats = await prisma.screen.findMany({
    where: {
      id: screenId
    },
    include: {
      seats: true
    }
  });
  console.log(seats)
  res.send(seats);
};

module.exports = seatsByScreenId;
