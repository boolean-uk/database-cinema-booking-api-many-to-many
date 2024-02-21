const express = require("express");
const { fetchSeats } = require("../controllers/seats");

const router = express.Router();

router.get("/", fetchSeats);

module.exports = router;
