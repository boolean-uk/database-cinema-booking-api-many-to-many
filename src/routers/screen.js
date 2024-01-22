const express = require("express");

const { getScreens } = require('../controllers/screen.js')

const router = express.Router();

router.get("/", getScreens);

module.exports = router;