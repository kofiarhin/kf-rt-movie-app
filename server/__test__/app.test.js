const users = require("./data/users");
const User = require("../models/userModel");
const app = require("../app");
const request = require("supertest");

describe("app", () => {
  it("should get list of users", async () => {
    const result = await User.find();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should login user properly", async () => {
    const user = users[0];
    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });
    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
  });

  it("should not login user with invalid credentials", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send({
        email: users[0].email,
        password: "invalid password",
      });

    expect(body.error).toBeDefined();
  });

  it("should register user properly", async () => {
    const user = {
      name: "test",
      email: "test@gmail.com",
      password: "password",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(user);
    expect(body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
      })
    );
  });

  it("should not register users with missing fields", async () => {
    const user = {
      name: "",
      email: "test2@gmail.com",
      password: "password",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(user);
    expect(body).toHaveProperty("error");
  });

  it("should not register duplicate users", async () => {
    const user = users[0];
    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(user);
    expect(body).toHaveProperty("error");
  });

  it("should test for token endpoint", async () => {
    const { body, statusCode } = await request(app).get("/api/verify-token");
  });

  it("should get token from routes", async () => {
    const { body, statusCode } = await request(app).get(
      "/api/verify-token/abcd"
    );
  });

  it("should test for token to be gen after registration", async () => {
    const user = {
      name: "david",
      email: "davidkraku69@gmail.com",
      password: "password",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(user);
    console.log("xxxxxx", body);
  });
});
