const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const bodyParser = require("body-parser");
const playerRoutes = require("./routes/playerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1.0/players", playerRoutes);
app.use("/api/v1.0/users", userRoutes);

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  });

// ✅ Ensure the server only starts when not testing
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ✅ Export the app instance for Jest tests
module.exports = app;
