const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const { password, ...rest } = user._doc;
    req.user = rest;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
