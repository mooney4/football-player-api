const express = require("express");
const { getUsers, getUser, registerUser, loginUser, removeUser } = require("../controllers/userController");

const router = express.Router();

// ✅ RESTful Naming for Endpoints
router.get("/", getUsers);       // GET /api/v1.0/users
router.get("/:id", getUser);     // GET /api/v1.0/users/:id
router.post("/register", registerUser); // POST /api/v1.0/users/register
router.post("/login", loginUser);  // POST /api/v1.0/users/login
router.delete("/:id", removeUser); // DELETE /api/v1.0/users/:id

module.exports = router;
