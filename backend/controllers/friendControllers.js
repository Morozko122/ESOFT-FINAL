class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }

    addFriend = async (req, res) => {
        try {
            const { userId, friendId } = req.body;
            const result = await this.friendService.addFriend(userId, friendId);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    removeFriend = async (req, res) => {
        try {
            const { userId, friendId } = req.body;
            const result = await this.friendService.removeFriend(userId, friendId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getFriends = async (req, res) => {
        try {
            const { userId } = req.params;  
            const friends = await this.friendService.getFriends(userId);
            res.status(200).json(friends);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    checkFriend = async (req, res) => {
        try {
          const userId = req.params.userId;
          const { currentUserId } = req.query;
          const user = await this.friendService.checkFriend(userId, currentUserId);
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ message: 'Ошибка при получении пользователя', error: error.message });
        }
    }
}

module.exports = FriendController;