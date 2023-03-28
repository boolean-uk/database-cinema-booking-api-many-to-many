const express = require('express');
const router = express.Router();
const cinemaController = require('../controller/controller');

router.get('/screens/:id', cinemaController.getScreenById);
router.post('/ticket', cinemaController.createTicket);

module.exports = router;
