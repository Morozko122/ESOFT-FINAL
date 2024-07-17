const UserService = require('../services/userServices');

class UserController {
    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async loginUser(req, res) {
        try {
            const userData = req.body;
            const token = await UserService.loginUser(userData);
            res.json(token); 
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    static async refreshToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            const newToken = await UserService.refreshToken(refreshToken);
            res.json(newToken);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = UserController;