
var jwt = require('jsonwebtoken');

module.exports = async(req,res, next)=>{
    const token  = req.header("token");
try {
    if (token && token!=undefined && token!=null) {

        jwt.verify(token,'hamada' ,(err ,decoded)=>{
             if (err) {
                 res.json({mesaage:"invalidToken"})
             }else{
                if (decoded.isLoggedIn) {
                    req.userID= decoded.userID;
                    req.userName= decoded.userName;
                    next();
                }else{
                 res.json({mesaage:"please login first"})

                }

             }
        })
        
    }
} catch (error) {
    res.json({mesaage:"catch auth error" , error})
}
 
}