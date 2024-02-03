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
  const { id } = req.params;
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
const readFavorite = async (req, res) => {
  try {
    // Fetch all items from the database
    const games = await tables.utilisateur.getFavoriteGame(req.params.pseudo);

    // Respond with the items in JSON format
    if (games.length === 0) {
      res.status(200).json([]);
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
      req.body.liked,
      req.body.rating
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
    const tokenPlayLog = jwt.sign({ utilisateur }, process.env.APP_SECRET);
    res.cookie("tokenPlayLog", tokenPlayLog, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({ utilisateur });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("tokenPlayLog");
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const admin = async (req, res) => {
  res.sendStatus(200);
};

const deleteFromList = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { id } = req.body;
    const result = await tables.utilisateur.deleteGame(id, gameId);
    if (result === 0) {
      return res.status(404).send("No game found");
    }
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const checkGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { id } = req.body;
    const [result] = await tables.utilisateur.getGame(id, gameId);
    if (!result) {
      return res.status(404).send("No game found");
    }
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const protectedRoute = async (req, res) => {
  const { id } = req.decoded;
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

// Ready to export the controller functions
module.exports = {
  add,
  addgame,
  readAll,
  update,
  login,
  logout,
  admin,
  find,
  deleteFromList,
  checkGame,
  readFavorite,
  protectedRoute,
};
