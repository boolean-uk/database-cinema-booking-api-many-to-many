const express = require("express");
const {
    getAllInfo
    
} = require('../controllers/screen');

const router = express.Router();

router.get("/:id", getAllInfo)


module.exports = router;