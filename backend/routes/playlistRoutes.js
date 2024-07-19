const express = require('express');
const authenticateToken = require('../middleware/middleware-jwt');

function createPlaylistRouter (playlistController){
    const router = express.Router();

    router.post('/create', authenticateToken, playlistController.createPlaylist);
    router.post('/addContent', authenticateToken, playlistController.addContentToPlaylist);
    router.post('/subscribe', authenticateToken, playlistController.subscribeToPlaylist);
    router.get('/userPlaylists', authenticateToken, playlistController.getUserPlaylists);
    router.get('/userplaylists/:id', authenticateToken, playlistController.getUserPlaylistsById);
    router.get('/content/:playlistId', authenticateToken, playlistController.getPlaylistContent);
    router.get('/subscriptions', authenticateToken, playlistController.getUserSubscriptions);
    router.delete('/delete/:playlistId', authenticateToken, playlistController.deletePlaylist);
    router.delete('/removeContent/:playlistId/:contentId', authenticateToken, playlistController.removeContentFromPlaylist);
    router.delete('/unsubscribe/:playlistId', authenticateToken, playlistController.unsubscribeFromPlaylist);  
    return router;
}


module.exports = createPlaylistRouter;