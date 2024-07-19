class UserController {
    constructor(userService) {
        this.userService = userService;
      }
    createUser = async (req, res) => {
        try {
            const userData = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    loginUser = async (req, res) => {
        try {
            const userData = req.body;
            const token = await this.userService.loginUser(userData);
            res.json(token); 
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    refreshToken = async (req, res) => {
        try {
            const refreshToken = req.body.refreshToken;
            const newToken = await this.userService.refreshToken(refreshToken);
            res.json(newToken);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    getUserProfile = async (req, res) => {
        try {
          const { userId } = req.params;
          const user = await this.userService.getUserProfile(userId);
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    }
    getUserByUsername = async (req, res) => {
        try {
          const { username } = req.params;
          const user = await this.userService.getUserByUsername(username);
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    } 
}

module.exports = UserController;