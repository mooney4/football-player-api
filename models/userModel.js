const pool = require("../config/db");

// ✅ Get All Users
const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT id, username, email FROM users");
  return rows;
};

// ✅ Get User by ID
const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [id]);
  return rows.length ? rows[0] : null;
};

// ✅ Create a New User
const createUser = async (userData) => {
  const { username, email, hashedPassword } = userData;
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

// ✅ Get User by Username (for Authentication)
const getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows.length ? rows[0] : null;
};

// ✅ Delete User
const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

module.exports = { getAllUsers, getUserById, createUser, getUserByUsername, deleteUser };
