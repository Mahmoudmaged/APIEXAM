

const postModel = require("../model/post.model")
module.exports= async (req, res) => {
    try {

        const postList = await postModel.find({}).populate("userID",'uname');
        res.json({postList} )
    } catch (error) {
        res.json({message:"catch home error",error})

    }
}