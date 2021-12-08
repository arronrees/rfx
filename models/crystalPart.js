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
    type: DataTypes.DECIMAL,
  },
  holder: {
    type: DataTypes.STRING,
  },
  height: {
    type: DataTypes.DECIMAL,
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
    type: DataTypes.DECIMAL,
  },
  c0: {
    type: DataTypes.DECIMAL,
  },
  q: {
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
  freq_stability: {
    type: DataTypes.INTEGER,
  },
  lower_turn_point: {
    type: DataTypes.STRING,
  },
  upper_turn_point: {
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
