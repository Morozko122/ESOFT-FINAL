const User = require('../models/userModel');
const Content = require('../models/contentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserService {
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
            const token = jwt.sign({ userId: user.user_id }, 'your_secret_key', { expiresIn: '1h' });
            return {
                token,
                user: {
                    userId: user.user_id,
                    username: user.username,
                }
            };
        } catch (error) {
            throw error;
        }
    }
    static async createContent(userData, userId) {
        try {
            const content = await Content.create({
                ...userData,
                user_id: userId
            });
            return content;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;