const UserService = require('../services/userServices');
const authenticateToken = require('../middleware/middleware-jwt');

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
    static async createContent(req, res) {
        console.log(authenticateToken);

        try {
            const userId = req.user.userId;
            const contentData = req.body;
            const newContent = await UserService.createContent(contentData, userId);
            res.status(201).json(newContent); 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;