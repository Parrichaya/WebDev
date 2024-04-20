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

const purchaseRoutes = require('./routes/purchase');
app.use('/purchase', purchaseRoutes);

const premiumRoutes = require('./routes/premium');
app.use('/premium', premiumRoutes);

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
    .then(() => {
        console.log('Table created!');
        app.listen(5000);
    })
    .catch(err => console.log(err))