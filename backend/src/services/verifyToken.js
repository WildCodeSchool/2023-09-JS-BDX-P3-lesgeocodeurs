const jwt = require("jsonwebtoken");

// Middleware de vérification du JWT
const verifyToken = (req, res, next) => {
  // Récupérer le JWT de l'en-tête Authorization
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentification requise" });
  }

  // Vérifier le JWT
  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.APP_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token invalide" });
      }

      req.user = decoded.user;
      next();
      return null;
    }
  );
  return null;
};

module.exports = {
  verifyToken,
};
