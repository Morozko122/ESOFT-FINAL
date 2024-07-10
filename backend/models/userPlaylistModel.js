const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const Playlist = require('./playlistModel');

const UserPlaylist = sequelize.define('UserPlaylist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'user-playlists',
  timestamps: false
});

User.belongsToMany(Playlist, { through: 'UserPlaylist' });
Playlist.belongsToMany(User, { through: 'UserPlaylist' });

module.exports = UserPlaylist;
