const express = require('express');

function createUserRouter(userController) {
    const router = express.Router();
    router.post('/users', userController.createUser);
    router.post('/login', userController.loginUser);
    router.post('/refresh', userController.refreshToken);
    return router;
}
module.exports = createUserRouter;