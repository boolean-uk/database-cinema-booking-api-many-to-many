const controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();

router.get("/screen/:id", controller.getScreenById);
router.post("/ticket", controller.createNewTicket);

module.exports = router;
