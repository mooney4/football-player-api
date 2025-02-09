const { getAllPlayers, getPlayerById, addPlayer, deletePlayer } = require("../models/playerModel");

// ✅ Naming Convention: `getPlayers` (Plural, Fetching All)
const getPlayers = async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error });
  }
};

// ✅ Naming Convention: `getPlayer` (Singular, Fetching One)
const getPlayer = async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player", error });
  }
};

// ✅ Fix: Return Full Player Object
const createPlayer = async (req, res) => {
  try {
    const newPlayer = await addPlayer(req.body); // Store inserted player
    res.status(201).json(newPlayer); // ✅ Return full player object
  } catch (error) {
    res.status(500).json({ message: "Error adding player", error });
  }
};

const removePlayer = async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    await deletePlayer(req.params.id);
    res.status(204).send(); // ✅ Corrected: No Content Response
  } catch (error) {
    res.status(500).json({ message: "Error deleting player", error });
  }
};

module.exports = { getPlayers, getPlayer, createPlayer, removePlayer };
