const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentType = sequelize.define('ContentType', {
  type_id: {
    type: DataTypes.SMALLINT,
    primaryKey: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'type (content)',
  timestamps: false
});

module.exports = ContentType;
