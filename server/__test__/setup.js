import dotenv from "dotenv";
import mongoose from "mongoose";
import { beforeAll } from "vitest";
dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_DEV);
});

afterAll(async () => {
  await mongoose.connection.close();
});
