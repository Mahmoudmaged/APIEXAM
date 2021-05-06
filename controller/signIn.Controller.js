const { validationResult } = require('express-validator');
const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        const signInErrors = validationResult(req);
        if (signInErrors.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {
                if (user.confirmed) {
                    const match = await bcrypt.compare(password, user.password);

                    if (match) {
                        const token = jwt.sign({ userID: user._id, userName: user.uname, isLoggedIn: true }, "hamada");
                        res.header({ token }).json({ message: "loginSuccess" });
                    } else {
                        res.json({ message: "invalid password", oldInputs: { email, password } })

                    }
                } else {
                    res.json({ message: "pleas confirm u email first" })
                }


            } else {
                res.json({ message: "invalid email", oldInputs: { email, password } })

            }
        } else {
            res.json({ message: "invalidData", oldInputs: { email, password }, messageError: signInErrors.array() })
        }

    } catch (error) {
        res.json({ message: "catch signIn error", error })

    }


}