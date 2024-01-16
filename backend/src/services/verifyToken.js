const jwt = require("jsonwebtoken");
const tables = require("../tables");

// Middleware de vérification du JWT
const verifyToken = (req, res, next) => {
  // Récupérer le JWT de l'en-tête Authorization
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentification requise" });
  }
  try {
    jwt.verify(token.replace("Bearer ", ""), process.env.APP_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }

  return null;
};

const verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentification requise" });
  }
  try {
    const tok = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.APP_SECRET
    );
    const checkIsAdmin = await tables.user.isAdmin(tok.id);
    if (checkIsAdmin.is_admin === 1) {
      next();
    } else {
      res.status(403).json({ message: "Not admin" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }

  return null;
};

module.exports = {
  verifyToken,
  verifyAdminToken,
};
