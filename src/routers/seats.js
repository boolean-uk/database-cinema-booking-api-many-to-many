const express = require("express")
const seatsByScreenId = require("../controllers/seats")

const router = express.Router()
router.get('/', seatsByScreenId)

module.exports = router