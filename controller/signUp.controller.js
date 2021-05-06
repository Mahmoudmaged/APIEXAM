 
const { validationResult } = require('express-validator');
const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
 
 module.exports =async (req, res) => {
    const { fname, lname, uname, email, password, cPassword } = req.body;
    try {
        const signUpErrors = validationResult(req);
        if (signUpErrors.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {
                res.json({ messsage: "email aleardy exist", oldInputs: { fname, lname, uname, email, password, cPassword } });
            } else {
                bcrypt.hash(password, 7, async (err, hash) => {
                    if (err) {
                        res.json({ messsage: "hash error", oldInputs: { fname, lname, uname, email, password, cPassword } });
                    } else {
                        let token = jwt.sign({ email }, 'shhhhh');
                        let transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "routesession@gmail.com", // generated ethereal user
                                pass: "1478530123", // generated ethereal password
                            },
                        });

                        // send mail with defined transport object
                        await transporter.sendMail({
                            from: "routesession@gmail.com",//sender mail
                            to: email, // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: `<a href="https://apisocialexam.herokuapp.com/${token}"> confirmed</a>`, // html body
                        });
                        await userModel.insertMany({ fname, lname, uname, email, password: hash })
                        res.json({ messsage: "valid data" });

                    }
                });
            }
        } else {
            res.json({ messsage: "in-valid data", errorMessage: signUpErrors.array() , oldInputs: { fname, lname, uname, email, password, cPassword }  });

        }

    } catch (error) {
        res.json({ messsage: "catch signUp Errors", error });

    }

}