const pool = require("../config/db");

// ✅ Create Players Table (Runs Once)
const createPlayerTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        player TEXT NOT NULL,
        team TEXT NOT NULL,
        games_played INTEGER DEFAULT 0,
        goals INTEGER DEFAULT 0
      );
    `);
    console.log("✅ Players table is ready.");
  } catch (error) {
    console.error("❌ Error creating players table:", error);
  }
};

createPlayerTable();

// ✅ CRUD Operations
const getAllPlayers = async () => {
  const { rows } = await pool.query("SELECT * FROM players");
  return rows;
};

const getPlayerById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
  return rows[0];
};

const addPlayer = async ({ player, team, games_played, goals }) => {
  await pool.query(
    "INSERT INTO players (player, team, games_played, goals) VALUES ($1, $2, $3, $4)",
    [player, team, games_played, goals]
  );
};

const deletePlayer = async (id) => {
  await pool.query("DELETE FROM players WHERE id = $1", [id]);
};

module.exports = { getAllPlayers, getPlayerById, addPlayer, deletePlayer };
