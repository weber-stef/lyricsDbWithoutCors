const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'VeryTopSecret'


module.exports = {
    /**Authentication method -> check if user exists with this token */
    verify: (req, res, next) => {

        if (req && req.headers['x-auth']) {

            const token = req.headers['x-auth'];
            console.log(`Auth using token: ${token}`)

            jwt.verify(token, secret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

                res.status(200).json({
                    status: "error",
                    message: 'no token provided',
                    user_id: decoded.id,
                    decoded
                })
            });

        } else {
            res.status(500).json({
                status: "error",
                message: 'no token provided'
            })
        }

    },

    login: (req, res) => {
        console.log(`Form received ${req.body.email}`)

        // Retrieve from Mongo if a user with this email exists
        UserModel.findOne({ email: req.body.email }, async (err, user) => {
            if (err) throw err;

            if (!user) {
                res.status(500).json({
                    status: "error",
                    message: "Auth failed: no user"
                })
            } else {
                // when I got the user I'll check if the submitted pwd is the same I have in the DB

                //if (user.password != req.body.password) {

                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    // nope
                    res.status(500).json({
                        status: "error",
                        message: "Auth failed: password wrong"
                    })
                } else {
                    console.log("Now I create the token")
                    //JWT token sign, it will contain the user _id
                    const token = jwt.sign({ id: user._id }, secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    if (token) {
                        res.json({
                            status: "error",
                            message: 'token created', token
                        })
                    } else {
                        res.json({
                            status: "error",
                            message: 'token not available'
                        })
                    }

                }



            }
        })
    }

}