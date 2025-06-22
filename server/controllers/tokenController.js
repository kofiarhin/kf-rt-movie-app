const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const path = require("path");

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify token
    const { email } = await jwt.verify(token, process.env.JWT_SECRET);

    if (!email) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in the database" });
    }

    // Update database: set verified to true
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { verified: true } },
      { new: true }
    );

    // Serve the verified HTML page
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
    console.error(error); // log error for debugging purposes
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyToken,
};
