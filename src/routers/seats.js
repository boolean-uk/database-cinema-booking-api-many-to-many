const express = require('express')
const { getSeats } = require('../controllers/seats')

const router = express.Router()

router.get('/', getSeats)


module.exports = router