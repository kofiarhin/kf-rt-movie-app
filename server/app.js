import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute";

const app = express();

//setup middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

export default app;
