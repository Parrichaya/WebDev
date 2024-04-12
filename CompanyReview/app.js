const express = require('express');
const app = express();

const sequelize = require('./util/database');

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let cors = require('cors');
app.use(cors());

const reviewRoutes = require('./routes/review');
app.use('/review', reviewRoutes);

sequelize.sync()
    .then(() => {
        console.log('Table created successfully!');
        app.listen(5000);
    })
    .catch(err => console.log(err))