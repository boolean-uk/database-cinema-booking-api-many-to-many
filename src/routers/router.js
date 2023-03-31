const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/:id", controller.getScreenById);
router.post("/ticket", controller.createTicket);

module.exports = router;
