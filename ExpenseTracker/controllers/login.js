const User = require("../models/user");

const bcrypt = require('bcrypt');

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email: email}})
    .then((user) => {
        if(!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        } 
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                return res.status(500).json({
                    message: "Authentication failed!"
                });
            }
            if(!result) {
                return res.status(401).json({
                    message: "Password is incorrect!"
                });
            } else {
                return res.status(200).json({
                    message: "Login Successful!",
                })
            }
        })
    })
    .catch(err => console.log(err));
}