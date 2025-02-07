require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");

const playerRoutes = require("./routes/playerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1.0/players", playerRoutes);
app.use("/api/v1.0/users", userRoutes);

app.use(errorHandler); // Global error handler

module.exports = app;
