import request from "supertest";
import app from "../app.js";
import { expect } from "vitest";

describe("auth", () => {
  // passing test
  it("passing test", () => {});

  //get route test
  it("route test", async () => {
    const { body, statusCode } = await request(app).get("/api/auth/register");
    expect(statusCode).toBe(200);
  });
});
