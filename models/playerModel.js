const pool = require("../config/db");

// ✅ Fetch All Players
const getAllPlayers = async () => {
  const { rows } = await pool.query("SELECT * FROM players");
  return rows;
};

// ✅ Fetch One Player by ID
const getPlayerById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
  return rows[0];
};

// ✅ Insert New Player
const createPlayer = async (player, team, games_played, goals) => {
  await pool.query(
    "INSERT INTO players (player, team, games_played, goals) VALUES ($1, $2, $3, $4)",
    [player, team, games_played, goals]
  );
};

module.exports = { getAllPlayers, getPlayerById, createPlayer };
