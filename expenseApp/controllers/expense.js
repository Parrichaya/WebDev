const Expense = require('../models/expense');

// Add a new expense to the database
exports.addExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    Expense.create({
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
    Expense.findAll()
    .then((expenses) => {
        res.status(200).json({allExpenses: expenses});
    })
    .catch(err => console.log(err));
}

// Delete an expense from the database
exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.id;
    Expense.destroy({where: {id: expenseId}})
    .then(() => {
        console.log('Expense deleted!');
        res.status(200).json({deletedExpense: expenseId});
    })
    .catch(err => console.log(err));
}

// Update an expense in the database
exports.editExpense = (req, res, next) => {
    const expenseId = req.params.id;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    Expense.update({
        amount: amount,
        description: description,
        category: category
    }, {where: {id: expenseId}})
    .then(() => {
        console.log('Expense updated!');
        res.status(200).json({updatedExpense: expenseId});
    })
    .catch(err => console.log(err));
}