const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'user',
    timestamps: false
});
User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds); 
});
module.exports = User;