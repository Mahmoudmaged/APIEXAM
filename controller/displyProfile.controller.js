

const postModel = require("../model/post.model")
module.exports= async (req, res) => {
    try {

        const postList = await postModel.find({userID:req.userID});
        res.json({postList} )
    } catch (error) {
        res.json({message:"catch home error",error})

    }
}