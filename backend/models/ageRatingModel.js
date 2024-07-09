const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AgeRating = sequelize.define('AgeRating', {
  rating_id: {
    type: DataTypes.SMALLINT,
    primaryKey: true
  },
  age: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
}, {
  tableName: 'age rating',
  timestamps: false
});

module.exports = AgeRating;
