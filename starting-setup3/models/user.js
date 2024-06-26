const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('shopUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = User;