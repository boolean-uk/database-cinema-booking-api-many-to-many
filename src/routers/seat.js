
const express = require('express')
const { getSeats, createTicket } = require('../controllers/seat.js')
const router = express.Router()

router.get('/:screenId', getSeats)

router.post('/ticket', createTicket)

module.exports = router