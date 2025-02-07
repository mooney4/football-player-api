const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).json({ message: "Token is missing" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" });
  }
};

const adminRequired = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { authenticateJWT, adminRequired };
