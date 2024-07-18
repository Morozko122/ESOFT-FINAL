const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Playlist = sequelize.define('Playlist', {
  playlist_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creator_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  favorite_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'playlist',
  timestamps: false
});

Playlist.belongsTo(User, { foreignKey: 'creator_id' });

module.exports = Playlist;
