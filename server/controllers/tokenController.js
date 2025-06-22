const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const path = require("path");

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.json({ message: "no token" });
    const { email } = await jwt.verify(token, process.env.JWT_SECRET);

    if (!email) {
      throw new Error("user not found");
    }

    // update database: verified to be true
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { verified: true } },
      { new: true }
    );

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "server",
      "public",
      "verified.html"
    );
    return res.sendFile(filePath);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyToken,
};
