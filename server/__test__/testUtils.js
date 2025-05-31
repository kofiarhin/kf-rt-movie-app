import users from "./data/users.js";
import app from "../app.js";
import request from "supertest";

// getAuthToken;
const getAuthToken = async (user = users[0]) => {
  const { body, statusCode, headers } = await request(app)
    .post("/api/auth/login")
    .send(user);
  const token = headers["set-cookie"][0].split("=")[1];
  return token;
};

const authRequest = async (method, url, user, payload = null) => {
  const token = await getAuthToken(user);
  const req = request(app)[method](url).set("Cookie", `token=${token}`);
  return payload ? req.send(payload) : req;
};

export { getAuthToken, authRequest };
