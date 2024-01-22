// const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library.js");

const { getScreenDB } = require("../domains/screen.js");

const getScreen = async (req, res) => {
    const id = Number(req.params.id)
    const foundScreens = await getScreenDB(id)
    res.status(200).json({screens: foundScreens})
}

module.exports = {
    getScreen
}
