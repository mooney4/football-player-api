const pool = require("../config/db");

// ✅ Create Users Table (Runs Once)
const createUserTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("✅ Users table is ready.");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};

createUserTable();

// ✅ CRUD Operations
const getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
};

const createUser = async ({ username, email, password }) => {
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password]
  );
};

module.exports = { getUserByUsername, createUser };
