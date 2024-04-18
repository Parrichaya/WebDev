const Expense = require('../models/expense');

// Add a new expense to the database
exports.addExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    req.user.createExpense({
        amount: amount, 
        description: description, 
        category: category
    })
    .then((newExpense) => {
        console.log('Expense added!');
        res.status(201).json({newExpenseDetail: newExpense});
    })
    .catch(err => console.log(err));
} 

// Get all expenses from the database
exports.getExpenses = (req, res, next) => {
    req.user.getExpenses()
    .then((expenses) => {
        res.status(200).json({allExpenses: expenses});
    })
    .catch(err => console.log(err));
}

// Delete an expense from the database
exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.id;
    req.user.getExpenses({where: {id: expenseId}})
    .then((expenses) => {
        if (!expenses) {
            return res.status(404).json({message: 'Expense not found!'});
        }
        const expenseToBeDeleted = expenses[0];
        expenseToBeDeleted.destroy()
        .then(() => {
            console.log('Expense deleted!');
            res.status(200).json({deletedExpense: expenseId});
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}