const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const { createUser } = require("../utils/helper");
const users = require("./data/users");

// setup environment variables
dotenv.config();

// clear DB
const clearDB = async () => {
  await User.deleteMany();
};

// before all
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    await clearDB();

    // populate database
    await Promise.all(users.map(async (user) => await createUser(user)));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}, 15000); // Increase timeout for slow startup

// after all
afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
