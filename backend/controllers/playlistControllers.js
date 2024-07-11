const PlaylistService = require('../services/playlistServices');

class PlaylistController {
  static async createPlaylist(req, res) {
    try {
      const { label } = req.body;
      const creatorId = req.user.userId;
      const playlist = await PlaylistService.createPlaylist(label, creatorId);
      res.status(201).json(playlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании плейлиста', error: error.message });
    }
  }
  
  static async deletePlaylist(req, res) {
    try {
      const { playlistId } = req.params;
      const userId = req.user.userId;
      await PlaylistService.deletePlaylist(playlistId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении плейлиста', error: error.message });
    }
  }

  static async removeContentFromPlaylist(req, res) {
    try {
      const { playlistId, contentId } = req.params;
      await PlaylistService.removeContentFromPlaylist(playlistId, contentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении контента из плейлиста', error: error.message });
    }
  }

  static async addContentToPlaylist(req, res) {
    try {
      const { playlistId, contentId } = req.body;
      const playlistContent = await PlaylistService.addContentToPlaylist(playlistId, contentId);
      res.status(201).json(playlistContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении контента в плейлист', error: error.message });
    }
  }

  static async getUserPlaylists(req, res) {
    try {
      const userId = req.user.userId;
      const playlists = await PlaylistService.getUserPlaylists(userId);
      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении плейлистов пользователя', error: error.message });
    }
  }

  static async getPlaylistContent(req, res) {
    try {
      const { playlistId } = req.params;
      const content = await PlaylistService.getPlaylistContent(playlistId);
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента плейлиста', error: error.message });
    }
  }
}

module.exports = PlaylistController;
