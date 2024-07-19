const Friend = require('../dbmodels/friendModel');
const User = require('../dbmodels/userModel');
class UserModel {
    static async addFriend(userId, friendId) {
        try {
            await Friend.create({
                user_id: userId,
                friend_id: friendId
            });

            return { message: 'Успешно' };
        } catch (error) {
            throw error;
        }
    }
    static async removeFriend(userId, friendId) {
        try {
            const friendship = await Friend.findOne({
                where: {
                    user_id: userId,
                    friend_id: friendId
                }
            });

            if (!friendship) {
                throw new Error('Пользователи не являются друзьями');
            }

            await friendship.destroy();

            return { message: 'Успешно' };
        } catch (error) {
            throw error;
        }
    }
    static async getFriends(userId) {
        try {
            const user = await Friend.findAll({
                where: { user_id: userId },
                include: [{
                    model: User,
                    as: 'friend',
                    attributes: ['user_id', 'username']
                }]
            });
            if (!user) {
                throw new Error('Пользователь не найден');
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
    static async checkFriend(userId, currentUserId) {
        try {
            const isFriend = await Friend.findOne({
                where: {
                    user_id: currentUserId,
                    friend_id: userId
                }
            });
            console.log(isFriend);
            if (!isFriend) {
                throw new Error('Пользователь не найден');
            }

            return { isFriend: !!isFriend };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;