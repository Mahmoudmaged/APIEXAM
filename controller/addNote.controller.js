const postModel = require("../model/post.model")
const { validationResult } = require('express-validator');
module.exports = async (req, res) => {
    const { title, desc } = req.body;
    try {
        const postError = validationResult(req);
        if (postError.isEmpty()) {
            // console.log(req.userID);
            await postModel.insertMany({ title, desc, userID: req.userID })
            res.json({ message: "Done" })

        } else {
            res.json({ message: "invalidData", messageError: postError.array(), oldInputs: { title, desc } })

        }
    } catch (error) {
        res.json({ message: "addNote catch error", error })
    }
}