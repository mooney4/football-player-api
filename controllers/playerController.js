const { getAllPlayers, getPlayerById, addPlayer, deletePlayer } = require("../models/playerModel");

const getPlayers = async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player", error });
  }
};

const createPlayer = async (req, res) => {
  try {
    await addPlayer(req.body);
    res.status(201).json({ message: "Player added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding player", error });
  }
};

const removePlayer = async (req, res) => {
  try {
    await deletePlayer(req.params.id);
    res.json({ message: "Player removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player", error });
  }
};

module.exports = { getPlayers, getPlayer, createPlayer, removePlayer };
