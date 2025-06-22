const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const auth = require("./middleware/auth");
const User = require("./models/userModel");
const playListRoutes = require("./routes/playListRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const path = require("path");

const app = express();

// Setup middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// test server
app.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

app.use("/api/auth", authRoutes);
app.use("/api/check", auth);
app.use("/api/play_list", playListRoutes);
app.use("/api/verify-token", tokenRoutes);

module.exports = app;
