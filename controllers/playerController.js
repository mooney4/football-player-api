const pool = require("../config/db");

// ✅ Get all players
const getPlayers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM players ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a single player by ID
const getPlayerById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM players WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Player not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Create a new player
const createPlayer = async (req, res) => {
  try {
    const { player, team, games_played } = req.body;
    const result = await pool.query(
      "INSERT INTO players (player, team, games_played) VALUES ($1, $2, $3) RETURNING *",
      [player, team, games_played]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// ✅ Update a player
const updatePlayer = async (req, res) => {
  const { games_played } = req.body;
  const updated = await pool.query(
    "UPDATE players SET games_played = $1 WHERE id = $2 RETURNING *",
    [games_played, req.params.id]
  );
  if (updated.rowCount === 0) return res.status(404).json({ message: "Player not found" });
  res.json({ message: "Player updated", player: updated.rows[0] });
};

// ✅ Delete a player
const deletePlayer = async (req, res) => {
  const deleted = await pool.query("DELETE FROM players WHERE id = $1", [req.params.id]);
  if (deleted.rowCount === 0) return res.status(404).json({ message: "Player not found" });
  res.status(204).send();
};

// ✅ Ensure all functions are exported correctly
module.exports = { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };
