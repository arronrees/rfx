const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('./db');

const CrystalModelHeight = db.define('CrystalModelHeight', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  height: {
    type: DataTypes.STRING,
  },
});

CrystalModelHeight.sync({ force: false }).then(() => {
  console.log('CrystalModelHeight model synced');
});

module.exports = CrystalModelHeight;
