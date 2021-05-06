
const postModel = require("../model/post.model")

module.exports = async (req, res) => {
try {
    const { _id , title,desc}= req.body
    await postModel.findOneAndUpdate({_id} ,{ title, desc , userID: req.userID})
    res.json({message:"updated"})
} catch (error) {
    res.json({error , message:"catch error"})
}

}