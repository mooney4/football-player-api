const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Player = sequelize.define("Player", {
  player: { type: DataTypes.STRING, allowNull: false },
  team: { type: DataTypes.STRING, allowNull: false },
  games_played: { type: DataTypes.INTEGER, defaultValue: 0 },
  games_started: { type: DataTypes.INTEGER, defaultValue: 0 },
  minutes_played: { type: DataTypes.INTEGER, defaultValue: 0 },
  goals: { type: DataTypes.INTEGER, defaultValue: 0 },
  assists: { type: DataTypes.INTEGER, defaultValue: 0 },
  shots: { type: DataTypes.INTEGER, defaultValue: 0 },
  shots_on_target: { type: DataTypes.INTEGER, defaultValue: 0 },
  comments: { type: DataTypes.JSONB, defaultValue: [] }, // JSONB for PostgreSQL
});

module.exports = Player;
