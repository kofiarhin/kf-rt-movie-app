import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//setup middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/api/auth/register", (req, res) => {
  return res.json({ message: "register user" });
});

export default app;
