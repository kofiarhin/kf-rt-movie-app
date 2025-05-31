import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
// connect database
connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started on:", port));
