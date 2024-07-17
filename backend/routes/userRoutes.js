const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');
const authenticateToken = require('../middleware/middleware-jwt');

router.post('/users', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/refresh', UserController.refreshToken);
module.exports = router;