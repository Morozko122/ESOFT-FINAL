const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Playlist = require('./playlistModel');
const Content = require('./contentModel');

const PlaylistContent = sequelize.define('PlaylistContent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'playlists-contents',
  timestamps: false
});

Content.belongsToMany(Playlist, { through: 'PlaylistContent' });
Playlist.belongsToMany(Content, { through: 'PlaylistContent' });
module.exports = PlaylistContent;
