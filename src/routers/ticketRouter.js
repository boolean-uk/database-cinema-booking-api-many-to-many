const express = require('express')
const router = express.Router()

// Controllers
const { getTicketsByScreenId } = require('../controllers/ticketController')

router.get('/screen/:id', getTicketsByScreenId)

module.exports = router
