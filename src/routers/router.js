const express = require("express")
const router = express.Router()
const {
  getScreenById,
  createTicket
} = require('../controllers/controller')

router.get('/screens/:id', getScreenById)
router.post('/tickets', createTicket)


module.exports = router