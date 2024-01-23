const prisma = require("../utils/prisma.js");

const getScreenDB = async (id) => {
  await prisma.screen.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      seats: true,
    },
  });
};

module.exports = {
  getScreenDB,
};
