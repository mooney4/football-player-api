const express = require("express");
const { getPlayers, getPlayer, createPlayer, removePlayer } = require("../controllers/playerController");

const router = express.Router();

router.get("/", getPlayers);
router.get("/:id", getPlayer);
router.post("/", createPlayer);
router.delete("/:id", removePlayer);

module.exports = router;
