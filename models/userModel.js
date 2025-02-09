const pool = require("../config/db");

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
