const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI_DEV;
    const con = await mongoose.connect(url);
    console.log("connected to database:", con.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
