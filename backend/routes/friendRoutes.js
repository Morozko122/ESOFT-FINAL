const express = require('express');

function createFriendRouter(friendController) {
    const router = express.Router();
    router.post('/add', friendController.addFriend);
    router.delete('/remove', friendController.removeFriend);
    router.get('/:userId', friendController.getFriends);
    return router;
}

module.exports = createFriendRouter;