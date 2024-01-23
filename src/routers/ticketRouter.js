const express = require('express')
const router = express.Router()

// Controllers
const {
  getTicketsByScreenId,
  createTicket
} = require('../controllers/ticketController')

router.get('/screen/:id', getTicketsByScreenId)

router.post('/', createTicket)

module.exports = router
