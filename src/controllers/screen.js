const { getScreenDb } = require('../domains/screen')

const getScreen = async (req, res) => {
    const id = Number(req.params.id)
    const screen = await getScreenDb(id)
    res.status(200).json({ screen: screen })
}

module.exports = { getScreen }