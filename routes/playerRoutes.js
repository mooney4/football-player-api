const express = require("express");
const { getPlayers, getPlayer, createPlayer, removePlayer } = require("../controllers/playerController");

const router = express.Router();

// ✅ RESTful Naming for Endpoints
router.get("/", getPlayers);      // GET /api/v1.0/players
router.get("/:id", getPlayer);    // GET /api/v1.0/players/:id
router.post("/", createPlayer);   // POST /api/v1.0/players
router.delete("/:id", removePlayer); // DELETE /api/v1.0/players/:id

module.exports = router;
