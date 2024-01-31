const tables = require("../tables");

const alreadyInYourList = async (req, res, next) => {
  try {
    const game = await tables.utilisateur.getGame(req.body.id, req.params.id);
    if (game.length === 0) {
      next();
    } else {
      res.status(400).json({ error: "Game already in your list" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { alreadyInYourList };
