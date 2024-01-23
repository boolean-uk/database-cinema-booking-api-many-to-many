const { getScreenDB } = require("../domain/screen.js");

const getScreen = async (req, res) => {
  const { id } = req.params;

  const screen = await getScreenDB(id);
  res.status(200).json({ screen });
};

module.exports = {
  getScreen,
};
