const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

let server;

beforeAll(async () => {
  server = require("../server"); // Start the server for testing
  await pool.query("DELETE FROM users"); // Clear users before tests
});

afterAll(async () => {
  await pool.end(); // Close database connection
  server.close(); // Close the server after tests
});

describe("User Authentication API", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1.0/users/register")
      .send({
        username: "john_doe",
        email: "john@example.com",
        password: "securePassword123"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("username", "john_doe");
  });

  it("should login and return a JWT token", async () => {
    const res = await request(app)
      .post("/api/v1.0/users/login")
      .send({
        username: "john_doe",
        password: "securePassword123"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should reject invalid login credentials", async () => {
    const res = await request(app)
      .post("/api/v1.0/users/login")
      .send({
        username: "john_doe",
        password: "wrongPassword"
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });
});
