const express = require('express');

const { getScreen } = require('../controllers/screen')

const router = express.Router();

router.get('/:id', getScreen);

module.exports = router;