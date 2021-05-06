 
const userModel = require("../model/user.model");
var jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const token = req.params.token;
try {
    if (token && token != undefined && token != null) {
        jwt.verify(token, 'shhhhh', async (err, decoded) => {
            if (err) {
                res.json({ messsage: "invalidToken" });
            } else {
                const email = decoded.email;
                console.log(email);
                await userModel.findOneAndUpdate({ email }, { confirmed: true });
                res.json({ messsage: "confirmed success" });

            }
        });
    }
} catch (error) {
    res.json({ messsage: "confirmed catch error" , error});
    
}
 

}