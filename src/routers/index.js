const express = require("express");
const { getScreen, createTicket } = require("../controllers/index");

const router = express.Router();
//Screen Req:
router.get("/:id", getScreen); //implement id

//Ticket Req:
router.post("/", createTicket);



module.exports = router;
