const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/middleware-jwt');
const ContentController = require('../controllers/contentControllers');
const upload = require('../config/multer');

const mediaUpload = upload.fields([{ name: 'mediaFile', maxCount: 1 }, { name: 'previewFile', maxCount: 1 }]);
router.post('/create', authenticateToken, mediaUpload, ContentController.createContent);
router.get('/get', (req, res) => {
     ContentController.getContent(req, res, req.query.sortBy);
});

module.exports = router;
