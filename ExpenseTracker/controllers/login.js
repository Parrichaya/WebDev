const User = require("../models/user");

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email: email}})
    .then((user) => {
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            });
        } if(password !== user.password) {
            return res.status(404).json({
                message: "Password incorrect!"
            });
        }
            res.status(200).json({
            message: "Login successful!"
        });
    })
    .catch(err => console.log(err));
}