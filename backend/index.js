const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const cors = require('cors')
const app = express();
const PORT = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api/content', contentRoutes);
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log('Error connecting to the database:', err));