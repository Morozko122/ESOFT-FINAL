const Playlist = require('../models/playlistModel');
const PlaylistContent = require('../models/playlistContentModel');
const UserPlaylist = require('../models/userPlaylistModel');
const User = require('../models/userModel');

class PlaylistService {
  static async createPlaylist(label, creatorId) {
    // try {
    //   const playlist = await Playlist.create({ label, creator_id: creatorId });
    //   return playlist;
    // } catch (error) {
    //   throw error;
    // }
    const transaction = await Playlist.sequelize.transaction();
    try {
      const playlist = await Playlist.create({ label, creator_id: creatorId }, { transaction });
      await UserPlaylist.create({ UserUserId: creatorId, PlaylistPlaylistId: playlist.playlist_id }, { transaction });
      await transaction.commit();
      return playlist;
    } catch (error) {
      await transaction.rollback();
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
      const playlists = await Playlist.findAll({
        where: { creator_id: userId },
        include: [
          {
            model: User,
            where: { user_id: userId },
            through: { model: UserPlaylist, where: { UserUserId: userId }}
          }
        ]
      });
      return playlists;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PlaylistService;
