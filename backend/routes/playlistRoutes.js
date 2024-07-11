// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../middleware/middleware-jwt');
// const PlaylistController = require('../controllers/playlistControllers');

// router.post('/create', authenticateToken, PlaylistController.createPlaylist);
// router.post('/addContent', authenticateToken, PlaylistController.addContentToPlaylist);
// router.get('/userPlaylists', authenticateToken, PlaylistController.getUserPlaylists);

// module.exports = router;
// playlistRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/middleware-jwt');
const PlaylistController = require('../controllers/playlistControllers');

router.post('/create', authenticateToken, PlaylistController.createPlaylist);
router.post('/addContent', authenticateToken, PlaylistController.addContentToPlaylist);
router.get('/userPlaylists', authenticateToken, PlaylistController.getUserPlaylists);
router.get('/content/:playlistId', authenticateToken, PlaylistController.getPlaylistContent);
router.delete('/delete/:playlistId', authenticateToken, PlaylistController.deletePlaylist);
router.delete('/removeContent/:playlistId/:contentId', authenticateToken, PlaylistController.removeContentFromPlaylist);

module.exports = router;