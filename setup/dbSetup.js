const pool = require("../config/db");

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        player VARCHAR(100) NOT NULL,
        team VARCHAR(100) NOT NULL,
        games_played INT DEFAULT 0,
        games_started INT DEFAULT 0,
        minutes_played INT DEFAULT 0,
        goals INT DEFAULT 0,
        assists INT DEFAULT 0,
        shots INT DEFAULT 0,
        shots_on_target INT DEFAULT 0,
        comments JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tables created successfully!");
    pool.end();
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    pool.end();
  }
};

createTables();
