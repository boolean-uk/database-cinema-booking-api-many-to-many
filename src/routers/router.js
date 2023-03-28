const express = require("express");
const controller = require("../controllers/controller.js");

const router = express.Router();

router.get("/:id", controller.getScreenInfo);
router.post("/ticket", controller.createNewTicket);

module.exports = router;
