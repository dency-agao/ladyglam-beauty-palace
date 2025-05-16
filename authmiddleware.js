const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'dency1234.'; // Fallback for development

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const tokenString = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenString, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired. Please login again." });
    }
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
