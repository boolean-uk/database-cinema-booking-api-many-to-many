const express = require("express");
const {
    getSeatsByScreenId
} = require('../controllers/seat');

const router = express.Router();


router.get("/:id", getSeatsByScreenId);

module.exports = router;