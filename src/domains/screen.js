const prisma = require("../utils/prisma.js");

const getScreensDB = async () => 
    await prisma.screen.findMany()


module.exports = {
    getScreensDB
}