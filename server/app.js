import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import auth from "./middleware/auth.js";
import User from "./models/userModel.js";

const app = express();

//setup middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});
app.use("/api/auth", authRoutes);
app.use("/api/check", auth);

export default app;
