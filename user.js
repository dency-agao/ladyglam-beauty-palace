const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();

// ✅ 1. GET User Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [user] = await pool.promise().query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = ?",
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 2. UPDATE User Profile
router.put("/profile", verifyToken, async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    await pool.promise().query(
      "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
      [firstName, lastName, req.user.id]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
