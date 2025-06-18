const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server started on:", port);
});
