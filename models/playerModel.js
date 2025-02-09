const pool = require("../config/db");

// ✅ Fix: Ensure Insert Matches Full Player Schema
const addPlayer = async (playerData) => {
  const {
    player,
    team,
    games_played,
    games_started,
    minutes_played,
    goals,
    assists,
    shots,
    shots_on_target,
    comments,
  } = playerData;

  const result = await pool.query(
    `INSERT INTO players (player, team, games_played, games_started, minutes_played, goals, assists, shots, shots_on_target, comments) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      player,
      team,
      games_played,
      games_started,
      minutes_played,
      goals,
      assists,
      shots,
      shots_on_target,
      JSON.stringify(comments),
    ]
  );

  return result.rows[0]; // ✅ Return full player object including ID
};

// ✅ Fetch All Players
const getAllPlayers = async () => {
  const { rows } = await pool.query("SELECT * FROM players");
  return rows;
};

// ✅ Fetch Player by ID
const getPlayerById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM players WHERE id = $1", [
    id,
  ]);
  return rows.length ? rows[0] : null;
};

// ✅ Fix: Ensure deletePlayer only deletes if the ID exists
const deletePlayer = async (id) => {
  await pool.query("DELETE FROM players WHERE id = $1", [id]);
};

module.exports = { addPlayer, getAllPlayers, getPlayerById, deletePlayer };
