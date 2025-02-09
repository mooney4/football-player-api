const request = require("supertest");
const app = require("../server");
const pool = require("../config/db");

describe("⚽ Player API Routes", () => {
  let createdPlayerId;

  beforeAll(async () => {
    // ✅ Ensure database is clean before tests
    await pool.query("DELETE FROM players");
  });

  afterAll(async () => {
    // ✅ Close database connection after tests to avoid leaks
    await pool.end();
  });

  // ✅ Test: Get All Players (Initially Empty)
  test("GET /api/v1.0/players should return an empty array", async () => {
    const response = await request(app).get("/api/v1.0/players");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // ✅ Test: Create a New Player
  test("POST /api/v1.0/players should create a player", async () => {
    const newPlayer = {
      player: "Junior Stanislas",
      team: "Bournemouth",
      games_played: 15,
      games_started: 7,
      minutes_played: 712,
      goals: 3,
      assists: 0,
      shots: 11,
      shots_on_target: 7,
      comments: [],
    };

    const response = await request(app)
      .post("/api/v1.0/players")
      .send(newPlayer);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.player).toBe("Junior Stanislas");
    expect(response.body.team).toBe("Bournemouth");
    expect(response.body.games_played).toBe(15);
    expect(response.body.games_started).toBe(7);
    expect(response.body.minutes_played).toBe(712);
    expect(response.body.goals).toBe(3);
    expect(response.body.assists).toBe(0);
    expect(response.body.shots).toBe(11);
    expect(response.body.shots_on_target).toBe(7);
    expect(response.body.comments).toEqual([]); // Ensure comments is an empty array

    createdPlayerId = response.body.id; // ✅ Store the player ID for future tests
  });

  // ✅ Test: Get All Players (After Adding One)
  test("GET /api/v1.0/players should return the newly created player", async () => {
    const response = await request(app).get("/api/v1.0/players");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].player).toBe("Junior Stanislas");
  });

  // ✅ Test: Get a Single Player by ID
  test("GET /api/v1.0/players/:id should return the created player", async () => {
    const response = await request(app).get(`/api/v1.0/players/${createdPlayerId}`);

    expect(response.status).toBe(200);
    expect(response.body.player).toBe("Junior Stanislas");
    expect(response.body.team).toBe("Bournemouth");
    expect(response.body.games_played).toBe(15);
    expect(response.body.games_started).toBe(7);
    expect(response.body.minutes_played).toBe(712);
    expect(response.body.goals).toBe(3);
    expect(response.body.assists).toBe(0);
    expect(response.body.shots).toBe(11);
    expect(response.body.shots_on_target).toBe(7);
    expect(response.body.comments).toEqual([]);
  });

  // ✅ Test: Delete a Player
test("DELETE /api/v1.0/players/:id should remove a player", async () => {
  const response = await request(app).delete(`/api/v1.0/players/${createdPlayerId}`);
  expect(response.status).toBe(204); // ✅ Expect 204 No Content

  // ✅ Verify player is deleted by checking GET /players/:id
  const checkResponse = await request(app).get(`/api/v1.0/players/${createdPlayerId}`);
  expect(checkResponse.status).toBe(404); // ✅ Expect 404 Not Found
});

});
