const express = require('express')
const { getSeats } = require('../controllers/seat.js')
const router = express.Router()

router.get('/:screenId', getSeats)

module.exports = router