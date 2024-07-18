const express = require('express');
const authenticateToken = require('../middleware/middleware-jwt');
const upload = require('../config/multer');

function createPlaylistRouter(contentController) {
     const router = express.Router();
     const mediaUpload = upload.fields([{ name: 'mediaFile', maxCount: 1 }, { name: 'previewFile', maxCount: 1 }]);
     router.post('/create', authenticateToken, mediaUpload, contentController.createContent);
     router.get('/get', (req, res) => {
          contentController.getContent(req, res, req.query.sortBy, req.query.order);
     });
     router.get('/get/:id', authenticateToken, contentController.getContentById);
     router.get('/user', authenticateToken, contentController.getUserContent);
     router.put('/update/:id', authenticateToken, mediaUpload, contentController.updateContent);
     router.delete('/delete/:id', authenticateToken, contentController.deleteContent);
     return router;
}

module.exports = createPlaylistRouter;