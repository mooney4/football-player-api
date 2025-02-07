const { Client } = require("pg");

// PostgreSQL connection configuration
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "footballdb",
  password: "mooney", // Change to your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

async function run() {
  try {
    // Connect to PostgreSQL
    await client.connect();
    console.log("✅ Connected to PostgreSQL");

    // Fetch all players
    const res = await client.query("SELECT * FROM players");
    console.log("📌 All Players:", res.rows);
  } catch (err) {
    console.error("❌ PostgreSQL Error:", err);
  } finally {
    await client.end();
  }
}

run();
