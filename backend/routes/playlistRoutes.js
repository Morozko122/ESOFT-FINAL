const express = require('express');
const authenticateToken = require('../middleware/middleware-jwt');

function createPlaylistRouter (playlistController){
    const router = express.Router();

    router.post('/create', authenticateToken, playlistController.createPlaylist);
    router.post('/addContent', authenticateToken, playlistController.addContentToPlaylist);
    router.get('/userPlaylists', authenticateToken, playlistController.getUserPlaylists);
    router.get('/content/:playlistId', authenticateToken, playlistController.getPlaylistContent);
    router.delete('/delete/:playlistId', authenticateToken, playlistController.deletePlaylist);
    router.delete('/removeContent/:playlistId/:contentId', authenticateToken, playlistController.removeContentFromPlaylist);
    
    return router;
}


module.exports = createPlaylistRouter;