const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/middleware-jwt');
const PlaylistController = require('../controllers/playlistControllers');

router.post('/create', authenticateToken, PlaylistController.createPlaylist);
router.post('/addContent', authenticateToken, PlaylistController.addContentToPlaylist);
router.get('/userPlaylists', authenticateToken, PlaylistController.getUserPlaylists);

module.exports = router;
