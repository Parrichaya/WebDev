const User = require("../models/user");

exports.addUser = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        username: username,
        email: email,
        password: password
    })
    .then((newUser) => {
        console.log('User added!');
        res.status(201).json({newUserDetail: newUser});
    })
    .catch((err) => {
        if(err.name === "SequelizeUniqueConstraintError") {
            res.status(409).json({message: "User already exists!"});
        } else {
            console.log(err);
            res.status(500).json({error: err});
        }
    })

}