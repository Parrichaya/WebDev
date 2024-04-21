const Expense = require('../models/expense');
const sequelize = require('../util/database');

// Add an expense from the database and update total expenses
exports.addExpense = async (req, res, next) => {
    const t = await req.user.sequelize.transaction();
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const newExpense = await req.user.createExpense({
            amount: amount,
            description: description,
            category: category
        }, { transaction: t });

        if (amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
        await req.user.increment({ totalExpenses: parseInt(amount) }, { transaction: t });

        await t.commit();
        console.log('Expense added and total expenses updated!');
        res.status(201).json({ newExpenseDetail: newExpense });
    } catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({ error: 'An error occurred.' });
    }
};


// Get all expenses from the database
exports.getExpenses = (req, res, next) => {
    req.user.getExpenses()
    .then((expenses) => {
        res.status(200).json({allExpenses: expenses});
    })
    .catch(err => console.log(err));
}

// Delete an expense from the database and update total expenses
exports.deleteExpense = async (req, res, next) => {
    const t = await req.user.sequelize.transaction();
    try {
        const expenseId = req.params.id;
        const expense = await req.user.getExpenses({where: {id: expenseId}});
        if (!expense) {
            throw new Error('Expense not found!');
        }
        const expenseToBeDeleted = expense[0];
        const amount = expenseToBeDeleted.amount;
        await req.user.decrement({ totalExpenses: parseInt(amount) }, { transaction: t });
        await expenseToBeDeleted.destroy({ transaction: t });
        await t.commit();
        console.log('Expense deleted and total expenses updated!');
        res.status(200).json({deletedExpense: expenseId});
    } catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({ error: 'An error occurred.' });
    }
}