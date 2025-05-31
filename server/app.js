import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute";
import auth from "./middleware/auth.js";

const app = express();

//setup middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/check", auth);

export default app;
