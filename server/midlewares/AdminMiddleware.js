const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.adminMidleware = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (!err) {
            User.findOne({ _id: payload._id })
                .then((user) => {
                    if (user.role === 'admin') {
                        next();
                    } else {
                        res.redirect('back');
                    }
                })
                .catch((error) => {
                    console.log({ message: "Something went wrong then check if user is admin", error: error });
                });
        } else {
            res.redirect('back');
        }
    });
}