const express = require("express");
const router = express.Router();

const { getScreen } = require("../controller/screen.js");

router.get("/:id", getScreen);

module.exports = router;
