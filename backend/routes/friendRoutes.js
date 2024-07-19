const express = require('express');

function createFriendRouter(friendController) {
    const router = express.Router();
    router.post('/add', friendController.addFriend);
    router.delete('/remove', friendController.removeFriend);
    router.get('/:userId', friendController.getFriends);
    router.get('/check/:userId', friendController.checkFriend);
    return router;
}

module.exports = createFriendRouter;