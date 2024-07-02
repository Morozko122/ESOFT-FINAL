const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');
const authenticateToken = require('../middleware/middleware-jwt');

router.post('/users', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route', user: req.user }); 
});
router.post('/create', authenticateToken, UserController.createContent);

module.exports = router;