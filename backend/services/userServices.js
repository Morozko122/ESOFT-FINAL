const jwt = require('jsonwebtoken');
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(userData) {
        return await this.userModel.createUser(userData);
    }
    async loginUser(userData) {
        const user = await this.userModel.loginUser(userData);
        const token = jwt.sign({ userId: user.user.userId }, 'your_secret_key', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user.user.userId }, 'your_refresh_secret_key', { expiresIn: '7d' });
        return {
            token,
            refreshToken,
            user
        };
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, 'your_refresh_secret_key');
            const token = jwt.sign({ userId: decoded.userId }, 'your_secret_key', { expiresIn: '1h' });
            return { token };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    async getUserProfile(userId) {
        return await this.userModel.findUser(userId);
    }

    async getUserByUsername(username) {
        return await this.userModel.findUserByUsername(username);
    }
}

module.exports = UserService;