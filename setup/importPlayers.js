const fs = require("fs");
const pool = require("../config/db");

const importData = async () => {
  try {
    console.log("⏳ Importing dataset...");

    // Read JSON file
    const players = JSON.parse(fs.readFileSync("players.json", "utf-8"));

    // Connect to the database
    const client = await pool.connect();

    // Clear existing data (optional)
    await client.query("DELETE FROM players");

    // Bulk insert players
    for (const player of players) {
      await client.query(
        `INSERT INTO players 
         (player, team, games_played, games_started, minutes_played, goals, assists, shots, shots_on_target, comments) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          player.player,
          player.team,
          player.games_played,
          player.games_started,
          player.minutes_played,
          player.goals,
          player.assists,
          player.shots,
          player.shots_on_target,
          JSON.stringify(player.comments), // Store as JSON
        ]
      );
    }

    client.release(); // Release database connection
    console.log("✅ Dataset imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
