const express = require('express');
const app = express();

const sequelize = require('./util/database');

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const expenseRoutes = require('./routes/expense');
app.use('/expense', expenseRoutes);

sequelize.sync()
    .then(() => {
        console.log('Table created!');
        app.listen(5000);
    })
    .catch(err => console.log(err))