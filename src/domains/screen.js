const prisma = require("../utils/prisma.js");

const getScreensDB = async () => 
    await prisma.screen.findMany({
        include: {
            seats: true
        }
    })


module.exports = {
    getScreensDB
}