class PlaylistController {
  constructor(playlistService) {
    this.playlistService = playlistService;
  }
  createPlaylist = async (req, res) => {
    try {
      const { label } = req.body;
      const creatorId = req.user.userId;
      console.log(creatorId);
      const playlist = await this.playlistService.createPlaylist(label, creatorId);
      res.status(201).json(playlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании плейлиста', error: error.message });
    }
  }

  deletePlaylist = async (req, res) => {
    try {
      const { playlistId } = req.params;
      const userId = req.user.userId;
      await this.playlistService.deletePlaylist(playlistId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении плейлиста', error: error.message });
    }
  }

  removeContentFromPlaylist = async (req, res) => {
    try {
      const { playlistId, contentId } = req.params;
      await this.playlistService.removeContentFromPlaylist(playlistId, contentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении контента из плейлиста', error: error.message });
    }
  }

  addContentToPlaylist = async (req, res) => {
    try {
      const { playlistId, contentId } = req.body;
      const playlistContent = await this.playlistService.addContentToPlaylist(playlistId, contentId);
      res.status(201).json(playlistContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении контента в плейлист', error: error.message });
    }
  }

  getUserPlaylists = async (req, res) => {
    try {
      const userId = req.user.userId;
      const playlists = await this.playlistService.getUserPlaylists(userId);
      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении плейлистов пользователя', error: error.message });
    }
  }

  getPlaylistContent = async (req, res) => {
    try {
      const { playlistId } = req.params;
      const content = await this.playlistService.getPlaylistContent(playlistId);
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента плейлиста', error: error.message });
    }
  }
}

module.exports = PlaylistController;
