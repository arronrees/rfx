const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('./db');

const ClockOscillator = db.define('ClockOscillator', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  stock: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  features: {
    type: DataTypes.TEXT,
  },
  package: {
    type: DataTypes.STRING,
  },
  freq_lower: {
    type: DataTypes.INTEGER,
  },
  freq_upper: {
    type: DataTypes.INTEGER,
  },
  freq_stability: {
    type: DataTypes.INTEGER,
  },
  temp_lower: {
    type: DataTypes.INTEGER,
  },
  temp_upper: {
    type: DataTypes.INTEGER,
  },
  output: {
    type: DataTypes.STRING,
  },
  voltage: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING(1024),
  },
  pdf: {
    type: DataTypes.STRING(1024),
  },
});

ClockOscillator.sync({ force: false }).then(() => {
  console.log('ClockOscillator model synced');
});

module.exports = ClockOscillator;
