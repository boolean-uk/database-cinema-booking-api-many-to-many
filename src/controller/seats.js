const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

// GET seats by id
const getSeatsById = async (req, res) => {
    const id = Number(req.params.id)

    const seats = await prisma.seats.findMany({
        where: {
            screening: {
                screenId: id
            }
        }
    })
}

module.exports = {
    getSeatsById
  };