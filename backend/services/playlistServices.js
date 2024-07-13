const Playlist = require('../models/playlistModel');
const PlaylistContent = require('../models/playlistContentModel');
const UserPlaylist = require('../models/userPlaylistModel');
const Content = require('../models/contentModel');

class PlaylistService {

  static async createPlaylist(label, creatorId) {
    const transaction = await Playlist.sequelize.transaction();
    try {
      const playlist = await Playlist.create({ label, creator_id: creatorId }, { transaction });
      const userPlaylist = await UserPlaylist.create({ UserUserId: creatorId, PlaylistPlaylistId: playlist.playlist_id }, { transaction });
      await transaction.commit();
      return {
        id: userPlaylist.id,
        UserUserId: userPlaylist.UserUserId,
        PlaylistPlaylistId: userPlaylist.PlaylistPlaylistId,
        Playlist: {
          playlist_id: playlist.playlist_id,
          label: playlist.label,
          creator_id: playlist.creator_id,
          favorite_count: playlist.favorite_count
        }
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deletePlaylist(playlistId, userId) {
    const transaction = await Playlist.sequelize.transaction();
    try {
      const playlist = await Playlist.findByPk(playlistId);
      if (!playlist) {
        throw new Error('Плейлист не найден');
      }
      if (playlist.creator_id !== userId) {
        throw new Error('Пользователь не является создателем плейлиста');
      }
      await UserPlaylist.destroy({ where: { PlaylistPlaylistId: playlistId } }, { transaction });
      await playlist.destroy({ transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async removeContentFromPlaylist(playlistId, contentId) {
    try {
      const result = await PlaylistContent.destroy({
        where: {
          PlaylistPlaylistId: playlistId,
          ContentContentId: contentId
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async addContentToPlaylist(playlistId, contentId) {
    try {
      const playlistContent = await PlaylistContent.create({ PlaylistPlaylistId: playlistId, ContentContentId: contentId });
      return playlistContent;
    } catch (error) {
      throw error;
    }
  }

  static async getUserPlaylists(userId) {
    try {
      const userPlaylists = await UserPlaylist.findAll({
        where: { UserUserId: userId },
        include: [
          {
            model: Playlist
          }
        ]
      });

      return userPlaylists;
    } catch (error) {
      throw error;
    }
  }

  static async getPlaylistContent(playlistId) {
    try {
      const playlistContent = await PlaylistContent.findAll({
        where: { PlaylistPlaylistId: playlistId },
        include: [
          {
            model: Content
          }
        ]
      });

      return playlistContent.map(pc => pc.Content);
    } catch (error) {
      throw error;
    }
  }

}

module.exports = PlaylistService;
