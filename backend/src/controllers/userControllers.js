// Import access to database tables
const tables = require("../tables");

// The A of BREAD - Add (Create) operation
const add = async (req, res) => {
  // Extract the user data from the request body
  const user = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.utilisateur.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(400).json({ error: err.message });
  }
};

const addgame = async (req, res) => {
  // Extract the user data from the request body
  const user = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.utilisateur.playedgame(req.params.id, user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(400).json({ error: err.message });
  }
};

const readAll = async (req, res) => {
  try {
    // Fetch all items from the database
    const games = await tables.utilisateur.getAllGame(req.params.pseudo);

    // Respond with the items in JSON format
    if (games.length === 0) {
      res.json({ error: "No games found" });
    } else {
      res.json(games);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(400).json({ error: err.message });
  }
};

// Ready to export the controller functions
module.exports = {
  add,
  addgame,
  readAll,
};
