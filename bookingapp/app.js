const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = require('./util/database');

const path = require('path');
const p = path.dirname(require.main.filename);

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user');

let cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Create the table
sequelize.sync()
    .then(() => {
        console.log('Table created!');
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err)
    });





