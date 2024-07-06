const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
    content_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    favorite_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.REAL,
        defaultValue: 0, 
        allowNull: false
    },
    rating_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    upload_date: {
        type: DataTypes.TIME,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'user_id'
        }
    }
}, {
    tableName: 'content',
    timestamps: false
});

module.exports = Content;