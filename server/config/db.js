const mongoose = require("mongoose");

const connectDB = async () => {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;
  try {
    const con = await mongoose.connect(url);
    console.log("connected to database:", con.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
