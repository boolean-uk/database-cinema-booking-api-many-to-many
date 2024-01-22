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

module.exports = {
  getScreenById,
};
