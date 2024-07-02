const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123321123@localhost:5432/finalDB', {
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;