const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getAllInfo = async(req, res) => {
    const screenId = Number( req.params.id);
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
}

module.exports = {
    getAllInfo,
  };