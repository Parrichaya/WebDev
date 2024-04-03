const User = require('../models/user');

// Add a new user in the database
exports.addUser = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    
    User.create({
        username: username,
        email: email,
        phone: phone
    })
    .then((newUser) => {
        console.log('User added!');
        res.status(201).json({newUserDetail: newUser});
    })
    .catch(err => console.log(err));
}

// Get all users from the database
exports.getUsers = (req, res, next) => {
    User.findAll()
    .then((users) => {
        res.status(200).json({allUsers: users});
    })
    .catch(err => console.log(err));
}

// Delete user from the database
exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.destroy({where: {id: userId}})
    .then(() => {
        console.log('User deleted!');
        res.status(200).json({deletedUser: userId});
    })
    .catch(err => console.log(err));
}

