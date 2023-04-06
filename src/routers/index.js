const express = require("express");
const { getScreen, createTicket } = require("../controllers/index");

const router = express.Router();

router.get("/:id", getScreen); 


router.post("/", createTicket);



module.exports = router;