const express = require("express");
const {
    getAllInfo,
    getSeats
    
} = require('../controllers/screen');

const router = express.Router();

router.get("/:id", getAllInfo)
router.get("/", getSeats)


module.exports = router;