const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Meeting = sequelize.define('meeting', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    time: Sequelize.STRING
})

module.exports = Meeting;