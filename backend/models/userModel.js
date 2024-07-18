const User = require('../dbmodels/userModel');
const bcrypt = require('bcrypt');
class UserModel {
    static async createUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw error;
        }
    }
    static async loginUser(userData) {
        try {
            const user = await User.findOne({ where: { email: userData.email } });
            if (!user || !(await bcrypt.compare(userData.password, user.password))) {
                throw new Error('Неверный логин или пароль');
            }
            return {
              user: {
                userId: user.user_id,
                username: user.username,
            }
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;