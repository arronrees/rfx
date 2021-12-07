const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('./db');

const CrystalModelFeature = db.define('CrystalModelFeature', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  feature: {
    type: DataTypes.STRING,
  },
});

CrystalModelFeature.sync({ force: false }).then(() => {
  console.log('CrystalModelFeature model synced');
});

module.exports = CrystalModelFeature;
