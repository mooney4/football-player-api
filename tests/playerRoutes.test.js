const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

let server;

beforeAll(async () => {
  server = require("../server"); // Start the server
  await pool.query("DELETE FROM players"); // Clear data before tests
});

afterAll(async () => {
  await pool.end();
  server.close();
});

describe("Player API Tests", () => {
  let playerId;
  let token;

  // Register a user and login to get a token
  beforeAll(async () => {
    await request(app)
      .post("/api/v1.0/users/register")
      .send({
        username: "admin",
        email: "admin@example.com",
        password: "password123"
      });

    const res = await request(app)
      .post("/api/v1.0/users/login")
      .send({
        username: "admin",
        password: "password123"
      });

    token = res.body.token;
  });

  it("should create a new player", async () => {
    const res = await request(app)
      .post("/api/v1.0/players")
      .set("x-access-token", token) // Authenticate request
      .send({
        player: "Lionel Messi",
        team: "Inter Miami",
        games_played: 30,
        goals: 25
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("player", "Lionel Messi");
    playerId = res.body.id; // Store the player ID for future tests
  });

  it("should fetch all players", async () => {
    const res = await request(app).get("/api/v1.0/players");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fetch a player by ID", async () => {
    const res = await request(app).get(`/api/v1.0/players/${playerId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("player", "Lionel Messi");
  });

  it("should update a player", async () => {
    const res = await request(app)
      .put(`/api/v1.0/players/${playerId}`)
      .set("x-access-token", token)
      .send({ goals: 30 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Player updated");
  });

  it("should delete a player", async () => {
    const res = await request(app)
      .delete(`/api/v1.0/players/${playerId}`)
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(204);
  });

  it("should return 404 for a non-existent player", async () => {
    const res = await request(app).get(`/api/v1.0/players/99999`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Player not found");
  });
});
