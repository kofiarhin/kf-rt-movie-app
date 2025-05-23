const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");

// setup middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// setup routes
app.use("/api/users", userRoutes);

module.exports = app;
