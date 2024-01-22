const { getSeatsDb } = require('../domains/seat.js')

const getSeats = async (req, res) => {
    const screenId = Number(req.params.screenId)
    const seats = await getSeatsDb(screenId)
    res.status(200).json({ seats })
}

module.exports = { getSeats }