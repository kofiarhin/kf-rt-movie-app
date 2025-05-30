import request from "supertest";
import app from "../app.js";
import { expect } from "vitest";

describe("auth", () => {
  // passing test
  it("passing test", () => {});

  //get route test
  it("testing register route", async () => {
    const { body, statusCode } = await request(app).post("/api/auth/register");
    expect(statusCode).toBe(200);
  });

  it("testing login route", async () => {
    const { body, statusCode } = await request(app).post("/api/auth/login");
    expect(statusCode).toBe(200);
  });
});
