const Joi = require("joi");
const argon2 = require("argon2");

const userSchema = Joi.object({
  pseudo: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const inscription = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.password = hashedPassword;

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { inscription, hashPassword };
