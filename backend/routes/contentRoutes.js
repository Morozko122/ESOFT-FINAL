const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/middleware-jwt');
const ContentController = require('../controllers/contentControllers');
const UserController = require('../controllers/userControllers');

router.post('/create', authenticateToken, UserController.createContent);
router.get('/get', (req, res) => {
    ContentController.getContent(req, res, req.query.sortBy);
});

module.exports = router;