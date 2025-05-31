import dotenv from "dotenv";
import mongoose from "mongoose";
import { beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import User from "../models/userModel.js";
import { createUser } from "../utils/helper.js";
import users from "./data/users.js";

// setup environment variables
dotenv.config();

// clear DB
const clearDB = async () => {
  await User.deleteMany();
};

// before all
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_DEV);
    await clearDB();

    // populate database
    await Promise.all(
      users.map(async (user) => {
        await createUser(user);
      })
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});

// after all
afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
