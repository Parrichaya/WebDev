const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// Define the User model
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = User;