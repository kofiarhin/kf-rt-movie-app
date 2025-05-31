import request from "supertest";
import users from "./data/users.js";
import app from "../app.js";
import { expect } from "vitest";
import { createUser } from "../utils/helper.js";
import users from "./data/users.js";
import User from "../models/userModel.js";

describe("auth", () => {
  // passing test
  it("passing test", () => {});

  //   it should register user properly

  it("should create user properly", async () => {
    // create user
    const user = {
      name: "test",
      email: "test@gmail.com",
      password: "password",
    };

    const newUser = await createUser(user);
    expect(newUser).toEqual(
      expect.objectContaining({
        _id: expect.any(Object),
        name: user.name,
      })
    );
  });

  it("should register user properly", async () => {
    const testUser = {
      name: "test2",
      email: "test2@gmail.com",
      password: "password",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(testUser);
    expect(statusCode).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
      })
    );
  });

  it("should not register user with missing fields", async () => {
    // details here
    const user = {
      name: "",
      email: "",
      password: "",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "please fill out all fields" });
  });

  it("should login user properly", async () => {
    const user = users[0];

    const { statusCode, body, headers } = await request(app)
      .post("/api/auth/login")
      .send(user);

    const token = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).toBe(200);
    expect(token).toBeTruthy();
    expect(body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
      })
    );
  });

  it("should not login user with empty fields", async () => {
    // details here
    const user = {
      email: "",
      password: "",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send(user);
    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "please fill out all fields" });
  });

  it("should not login user with invalid password", async () => {
    // details here
    const user = {
      email: "kofiarhin@gmail.com",
      password: "somerandompasssword",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send(user);
    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "check credentials and try again" });
  });
});
