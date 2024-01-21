const express = require("express");
const { getSeatsById } = require("../controllers/seats");

const router = express.Router();

router.get("/:id", getSeatsById);

module.exports = router;
