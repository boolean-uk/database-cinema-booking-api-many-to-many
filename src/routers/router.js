const express = require("express");
const {
    getAllInfo,
    getSeats,
    createTicket
    
} = require('../controllers/controller');

const router = express.Router();

router.get("/:id", getAllInfo)
router.get("/", getSeats)
router.post("/ticket", createTicket)



module.exports = router;