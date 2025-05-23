const request = require("supertest");
const app = require("../app");

describe("testing user", () => {
  it("should get list of users", async () => {
    const { body, statusCode } = await request(app).get("/api/users");
    console.log(body);
    expect(statusCode).toBe(200);
  });
});
