const express = require("express");
const {
    getAllSeats,
    createSeat,
    getSeatById,
    updateSeat,
    deleteSeat
} = require('../controllers/seats');

const router = express.Router()

router.get('/', getAllSeats)
router.put('/', createSeat)
router.get('/:id', getSeatById)
router.post('/:id', updateSeat)
router.delete('/:id', deleteSeat)
module.exports = router