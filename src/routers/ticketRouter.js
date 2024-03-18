const express = require('express')
const router = express.Router()

// Controllers
const {
  getSeatsByScreenId,
  createTicket
} = require('../controllers/ticketController')

router.get('/screen/:id', getSeatsByScreenId)

router.post('/', createTicket)

module.exports = router
