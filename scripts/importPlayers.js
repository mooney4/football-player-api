require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

console.log("🔍 Debug: DB_PASSWORD =", typeof process.env.DB_PASSWORD, `"${process.env.DB_PASSWORD}"`);

const importData = async () => {
  try {
    const playersFilePath = path.join(__dirname, "../data/players.json");
    const players = JSON.parse(fs.readFileSync(playersFilePath, "utf-8"));

    await pool.query("DELETE FROM players"); // Clear existing data

    for (const player of players) {
      await pool.query(
        "INSERT INTO players (player, team, games_played, goals) VALUES ($1, $2, $3, $4)",
        [player.player, player.team, player.games_played, player.goals]
      );
    }

    console.log("✅ Dataset imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
