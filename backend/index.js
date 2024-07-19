const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');



const cors = require('cors')
const app = express();
const path = require('path');
const PORT = 3000;


const PlaylistModel = require('./models/playlistModel')
const UserModel = require('./models/userModel')
const ContentModel = require('./models/contentModel')
const FriendModel = require('./models/friendModel');

const PlaylistService = require('./services/playlistServices')
const UserService = require('./services/userServices')
const ContentService = require('./services/contentServices')
const FriendService = require('./services/friendServices');

const PlaylistController = require('./controllers/playlistControllers')
const UserController = require('./controllers/userControllers')
const ContentController = require('./controllers/contentControllers')
const FriendController = require('./controllers/friendControllers');

const createPlaylistRouter = require('./routes/playlistRoutes')
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const friendRoutes = require('./routes/friendRoutes');

const playlistService = new PlaylistService(PlaylistModel);
const userService = new UserService(UserModel);
const contentService = new ContentService(ContentModel);
const friendService = new FriendService(FriendModel, UserModel);

const playlistController = new PlaylistController(playlistService);
const userController = new UserController(userService);
const contentController = new ContentController(contentService);
const friendController = new FriendController(friendService);

app.use(cors())
app.use(bodyParser.json());
app.use('/api', userRoutes(userController));
app.use('/api/content', contentRoutes(contentController));
app.use('/api/playlists', createPlaylistRouter(playlistController));
app.use('/api/friends', friendRoutes(friendController));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log('Error connecting to the database:', err));