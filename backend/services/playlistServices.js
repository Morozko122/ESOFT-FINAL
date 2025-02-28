class PlaylistService {
  constructor(playlistModel) {
    this.playlistModel = playlistModel;
  }

  async createPlaylist(label, creatorId) {
    return await this.playlistModel.createPlaylist(label, creatorId);
  }

  async deletePlaylist(playlistId, userId) {
    return await this.playlistModel.deletePlaylist(playlistId, userId);
  }

  async removeContentFromPlaylist(playlistId, contentId) {
    return await this.playlistModel.removeContentFromPlaylist(playlistId, contentId);
  }

  async addContentToPlaylist(playlistId, contentId) {
    return await this.playlistModel.addContentToPlaylist(playlistId, contentId);
  }

  async getUserPlaylists(userId) {
    return await this.playlistModel.getUserPlaylists(userId);
  }

  async getPlaylistContent(playlistId) {
    return await this.playlistModel.getPlaylistContent(playlistId);
  }

  async subscribeToPlaylist(userId, playlistId){
    return await this.playlistModel.subscribeToPlaylist(userId, playlistId);
  }

  async unsubscribeFromPlaylist(userId, playlistId){
    return await this.playlistModel.unsubscribeFromPlaylist(userId, playlistId);
  }
  
  async getUserSubscriptions(userId){
    return await this.playlistModel.getUserSubscriptions(userId);
  }
}
module.exports = PlaylistService;
