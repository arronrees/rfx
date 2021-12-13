const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('./db');

const CrystalPart = db.define('CrystalPart', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  model: {
    type: DataTypes.STRING,
  },
  standard_parts: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  frequency: {
    type: DataTypes.FLOAT,
  },
  holder: {
    type: DataTypes.STRING,
  },
  height: {
    type: DataTypes.FLOAT,
  },
  cut: {
    type: DataTypes.STRING,
  },
  mode: {
    type: DataTypes.STRING,
  },
  load: {
    type: DataTypes.STRING,
  },
  esr: {
    type: DataTypes.INTEGER,
  },
  c1: {
    type: DataTypes.FLOAT,
  },
  c0: {
    type: DataTypes.FLOAT,
  },
  q_factor: {
    type: DataTypes.INTEGER,
  },
  freq_tol: {
    type: DataTypes.INTEGER,
  },
  reference_temp: {
    type: DataTypes.INTEGER,
  },
  temp_lower: {
    type: DataTypes.INTEGER,
  },
  temp_upper: {
    type: DataTypes.INTEGER,
  },
  temp_range: {
    type: DataTypes.INTEGER,
  },
  freq_stability: {
    type: DataTypes.INTEGER,
  },
  lower_lower_turn_point: {
    type: DataTypes.INTEGER,
  },
  lower_upper_turn_point: {
    type: DataTypes.INTEGER,
  },
  upper_lower_turn_point: {
    type: DataTypes.INTEGER,
  },
  upper_upper_turn_point: {
    type: DataTypes.INTEGER,
  },
  upper_range: {
    type: DataTypes.STRING,
  },
  lower_range: {
    type: DataTypes.STRING,
  },
  mounting: {
    type: DataTypes.STRING,
  },
});

CrystalPart.sync({ force: false }).then(() => {
  console.log('CrystalPart model synced');
});

module.exports = CrystalPart;
