
const postModel = require("../model/post.model")

module.exports = async (req, res) => {
try {
    await postModel.findOneAndDelete({_id:req.body.id})
    res.json({message:"deleted"})
} catch (error) {
    res.json({error , message:"catch error"})
}

}