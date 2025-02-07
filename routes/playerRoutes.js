const express = require("express");
const { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } = require("../controllers/playerController"); // ✅ Ensure correct import

const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.post("/", authenticateJWT, createPlayer);
router.put("/:id", authenticateJWT, updatePlayer);
router.delete("/:id", authenticateJWT, deletePlayer);

module.exports = router;
