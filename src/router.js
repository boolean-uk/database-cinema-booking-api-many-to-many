const express = require("express");
const router = express.Router();

const { retrieveScreenById, createTicket } = require("./controller");

router.get("/screen/:id", retrieveScreenById);
router.post("/ticket", createTicket);

module.exports = router;
