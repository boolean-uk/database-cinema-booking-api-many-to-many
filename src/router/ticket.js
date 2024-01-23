const express = require("express");
const router = express.Router();

const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  try {
    const { screeningId, customerId, seats } = req.body;

    const screening = await prisma.screening.findMany({
      where: { id: screeningId },
    });

    const customer = await prisma.customer.findMany({
      where: { id: customerId },
    });

    if (!screening || !customer) {
      return res
        .status(404)
        .json({ error: "Screening or customer not found." });
    }

    const ticket = await prisma.ticket.create({
      data: {
        screening: { connect: { id: screeningId } },
        customer: { connect: { id: customerId } },
        seats: {
          create: seats.map((seat) => ({
            ...seat,
            screenId: screening.screenId,
          })),
        },
      },
      include: {
        screening: true,
        customer: true,
        seats: true,
      },
    });

    res.json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
