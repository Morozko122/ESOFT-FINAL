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
    static async findUser(userId){
        try {
            const user = await User.findByPk(userId);
            if (!user ) {
                throw new Error('Пользователь не найден');
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
    static async findUser(userId) {
        try {
          const user = await User.findByPk(userId);
          if (!user) {
            throw new Error('Пользователь не найден');
          }
          return {
            userId: user.user_id,
            username: user.username,
          };
        } catch (error) {
          throw error;
        }
      }
    static async findUserByUsername(username){
        try {
            const user = await User.findOne({ where: { username: username }, attributes: ['user_id'] });
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            return {
              user: {
                userId: user.user_id
            }
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;