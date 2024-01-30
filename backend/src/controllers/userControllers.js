// Import access to database tables
const jwt = require("jsonwebtoken");
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

const find = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await tables.utilisateur.readId(id);
    if (!result) {
      res.status(404).send("No user found");
    }
    delete result.password;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readAll = async (req, res) => {
  try {
    // Fetch all items from the database
    const games = await tables.utilisateur.getAllGame(req.params.pseudo);

    // Respond with the items in JSON format
    if (games.length === 0) {
      res.status(404).json({ error: "No games found" });
    } else {
      res.json(games);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    // Fetch all items from the database
    const games = await tables.utilisateur.updateGame(
      req.body.id,
      req.params.id,
      req.body.liked
    );

    // Respond with the items in JSON format
    if (games === 0) {
      res.status(404).json({ error: "No games found" });
    } else {
      res.json({ affectedRows: games });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const utilisateur = req.user;
    const token = jwt.sign({ utilisateur }, process.env.APP_SECRET);
    res.cookie("tokenPlayLog", token, { httpOnly: true });
    res.json({ utilisateur });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const admin = async (req, res) => {
  res.status(200).json({ message: "Welcome to the admin page" });
};

// Ready to export the controller functions
module.exports = {
  add,
  addgame,
  readAll,
  update,
  login,
  admin,
  find,
};
