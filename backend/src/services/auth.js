const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const verifyPassword = async (req, res, next) => {
  try {
    const [utilisateur] = await tables.utilisateur.read(req.body.pseudo);
    if (!utilisateur) {
      res
        .status(400)
        .send("Utilisateur ou mot de passe incorrect, veuillez réessayer.");
    }

    if (await argon2.verify(utilisateur.password, req.body.password)) {
      delete utilisateur.password;
      req.user = utilisateur;
      next();
    } else {
      res.status(401).send("Mot de passe incorrect, veuillez réessayer.");
    }
  } catch (err) {
    next(err);
  }
};

const checkToken = async (req, res, next) => {
  const { tokenPlayLog } = req.cookies;
  if (!tokenPlayLog) {
    return res.status(403).send("Token non fournie");
  }
  try {
    const decoded = jwt.verify(tokenPlayLog, process.env.APP_SECRET);
    if (decoded) {
      req.decoded = decoded.utilisateur;
      return next();
    }
    res.clearCookie("tokenPlayLog");
    return res.status(403).json({ error: "Token invalide" });
  } catch (error) {
    res.clearCookie("tokenPlayLog");
    return res.status(403).json({ error: "Token invalide" });
  }
};

module.exports = { verifyPassword, checkToken };
