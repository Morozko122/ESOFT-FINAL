class FriendService {
    constructor(friendModel, userModel) {
        this.friendModel = friendModel;
        this.userModel = userModel;
    }

    async addFriend(userId, friendId) {

        const user = await this.userModel.findUser(userId);
        const friend = await this.userModel.findUser(friendId);

        if (!user || !friend) {
            throw new Error('Пользователь не найден');
        }
        console.log(user);
        await this.friendModel.addFriend(user.user.userId, friend.user.userId);

        return { message: 'Успешно' };
    }

    async removeFriend(userId, friendId) {
        return await this.friendModel.removeFriend(userId, friendId);
    }

    async getFriends(userId) {
        return await this.friendModel.getFriends(userId);
    }
}

module.exports = FriendService;