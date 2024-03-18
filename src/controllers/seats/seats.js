const prisma = require('../../utils/prisma.js');

const getSeatsByScreenId = async (req, res) => {
    const { id } = Number(req.params);
    const seats = await prisma.seat.findMany({
        where: {
            screenId: id
        },
        include: {
            screen: true
        }
    });
    res.json(seats);
};

module.exports = { 
    getSeatsByScreenId
};