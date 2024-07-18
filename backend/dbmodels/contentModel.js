const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const AgeRating = require('./ageRatingModel');
const ContentType = require('./contentTypeModel');

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
    allowNull: false,
    references: {
      model: ContentType,
      key: 'type_id'
    }
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
    allowNull: false,
    references: {
      model: AgeRating,
      key: 'rating_id'
    }
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
      model: User,
      key: 'user_id'
    }
  }
}, {
  tableName: 'content',
  timestamps: false
});

Content.belongsTo(User, { foreignKey: 'user_id' });
Content.belongsTo(AgeRating, { foreignKey: 'rating_id' });
Content.belongsTo(ContentType, { foreignKey: 'type_id' });

module.exports = Content;
