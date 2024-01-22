const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library.js");

const { getScreensDB } = require("../domains/screen.js");

const getScreens = async (req, res) => {
    const foundScreens = await getScreensDB()
    res.status(200).json({screens: foundScreens})
}

module.exports = {
    getScreens
}
