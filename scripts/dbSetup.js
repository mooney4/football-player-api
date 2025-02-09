require("dotenv").config({ path: "../.env" });  // ✅ Correct path from scripts folder
const pool = require("../config/db");

const setupDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        player TEXT NOT NULL,
        team TEXT NOT NULL,
        games_played INTEGER DEFAULT 0,
        goals INTEGER DEFAULT 0
      );
    `);

    console.log("✅ Database setup complete!");
    process.exit();
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    process.exit(1);
  }
};

// Run setup
setupDatabase();
