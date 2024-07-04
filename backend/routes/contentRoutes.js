const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/middleware-jwt');
const ContentController = require('../controllers/contentControllers');
const upload = require('../config/multer');

router.post('/create', authenticateToken, upload.single('mediaFile'), ContentController.createContent);
router.get('/get', (req, res) => {
     ContentController.getContent(req, res, req.query.sortBy);
});

module.exports = router;
