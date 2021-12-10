const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('./db');

const CrystalModel = db.define('CrystalModel', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  model: {
    type: DataTypes.STRING,
  },
  features: {
    type: DataTypes.STRING,
  },
  holder: {
    type: DataTypes.STRING,
  },
  freq_lower: {
    type: DataTypes.INTEGER,
  },
  freq_upper: {
    type: DataTypes.INTEGER,
  },
  esr_lower: {
    type: DataTypes.INTEGER,
  },
  esr_upper: {
    type: DataTypes.INTEGER,
  },
  cut: {
    type: DataTypes.STRING,
  },
  mode: {
    type: DataTypes.STRING,
  },
  q_factor_lower: {
    type: DataTypes.INTEGER,
  },
  q_factor_upper: {
    type: DataTypes.INTEGER,
  },
  freq_tol: {
    type: DataTypes.INTEGER,
  },
  height: {
    type: DataTypes.STRING,
  },
  temp_lower: {
    type: DataTypes.INTEGER,
  },
  temp_upper: {
    type: DataTypes.INTEGER,
  },
  temp_range: {
    type: DataTypes.STRING,
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
  image: {
    type: DataTypes.STRING,
  },
  pdf: {
    type: DataTypes.STRING,
  },
});

CrystalModel.sync({ force: false }).then(() => {
  console.log('CrystalModel model synced');
});

module.exports = CrystalModel;
