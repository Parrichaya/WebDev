const User = require("../models/user");
const Expense = require("../models/expense");

const sequelize = require("../util/database");

exports.getUserLeaderboard = async (req, res) => {
    try {
        const users = await User.findAll();
        const leaderboard = [];

        for (const user of users) {
            const expenses = await Expense.findAll({ where: { userId: user.id } });

            let totalAmount = 0;
            for (const expense of expenses) {
                totalAmount += expense.amount;
            }

            leaderboard.push({username: user.username, totalAmount});
        }
        
        leaderboard.sort((a, b) => b.totalAmount - a.totalAmount);
        console.log(leaderboard);
        res.status(200).json({leaderboard});
    } catch (err) {
        console.error(err);
    }
}