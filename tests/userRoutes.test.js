const request = require("supertest");
const app = require("../server");
const pool = require("../config/db");

describe("👤 User API Routes", () => {
  let createdUserId;
  let userToken;

  beforeAll(async () => {
    // ✅ Ensure database is clean before tests
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    // ✅ Close database connection after tests to avoid leaks
    await pool.end();
  });

  // ✅ Test: Get All Users (Initially Empty)
  test("GET /api/v1.0/users should return an empty array", async () => {
    const response = await request(app).get("/api/v1.0/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // ✅ Test: Register a New User
  test("POST /api/v1.0/users/register should create a new user", async () => {
    const newUser = {
      username: "testuser",
      email: "testuser@example.com",
      password: "securepassword",
    };

    const response = await request(app)
      .post("/api/v1.0/users/register")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");

    createdUserId = response.body.user.id;
  });

  // ✅ Test: Login User
  test("POST /api/v1.0/users/login should authenticate a user", async () => {
    const loginDetails = {
      username: "testuser",
      password: "securepassword",
    };

    const response = await request(app)
      .post("/api/v1.0/users/login")
      .send(loginDetails);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    userToken = response.body.token; // Store token for authenticated requests
  });

  // ✅ Test: Get User by ID
  test("GET /api/v1.0/users/:id should return user details", async () => {
    const response = await request(app)
      .get(`/api/v1.0/users/${createdUserId}`)
      .set("x-access-token", userToken); // Send auth token

    expect(response.status).toBe(200);
    expect(response.body.username).toBe("testuser");
  });

  // ✅ Test: Delete User
  test("DELETE /api/v1.0/users/:id should remove a user", async () => {
    const response = await request(app)
      .delete(`/api/v1.0/users/${createdUserId}`)
      .set("x-access-token", userToken); // Send auth token

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User removed");

    // Verify user is deleted
    const checkResponse = await request(app).get(`/api/v1.0/users/${createdUserId}`);
    expect(checkResponse.status).toBe(404);
  });
});
