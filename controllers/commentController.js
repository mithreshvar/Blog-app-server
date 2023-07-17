const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

// //  get all Comments
// const getComments = async (req, res) => {

//     const comment = await Comment.find({}).sort({ createdAt: -1 });

//     res.status(200).json(comment);
// }

// //  get Comment
// const getComment = async (req, res) => {
//     const { id } = req.params;

//     const comment = await Comment.findById(id);

//     if (!comment) {
//         return res.status(404).json({ error: "No such Comment" });
//     }
//     res.status(200).json(comment);
// }

//  get blog Comment
const getBlogComment = async (req, res) => {
    const { blog_id } = req.params;

    const comment = await Comment.find({ blog_id }).sort({ createdAt: 1 });

    if (!comment) {
        return res.status(404).json({ error: "No such blog" });
    }
    res.status(200).json(comment);
}

// create a Comment
const createComment = async (req, res) => {
    const user_id = req.user._id
    const { blog_id } = req.params;
    const { comment } = req.body;

    let emptyFields = []

    if (!comment) {
        emptyFields.push('comment')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Missing Fields', emptyFields })
    }

    // add doc to db
    try {
        const c = await Comment.create({ comment, user_id, blog_id });
        res.status(200).json(c);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a Comment
const deleteComment = async (req, res) => {
    const user_id = req.user._id
    const { id } = req.params;

    // validating id to prevent server crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Comment" })
    }

    const comment = await Comment.findOne({ _id: id });
    
    if (!comment) {
        return res.status(404).json({ error: "No such Comment" });
    }

    if (comment.user_id != user_id) {
        return res.status(401).json({ error: "access denied" })
    }
    
    await Comment.deleteOne({ _id: id })

    res.status(200).json(comment);
}

// update a Comment
const updateComment = async (req, res) => {
    const user_id = req.user._id
    const { id } = req.params;

    // validating id to prevent server crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Comment" })
    }

    let comment = await Comment.findOne({ _id: id });
    
    if (!comment) {
        return res.status(404).json({ error: "No such Comment" });
    }

    if (comment.user_id != user_id) {
        return res.status(401).json({ error: "access denied" })
    }

    comment = await Comment.findOneAndUpdate({ _id:id }, {
        ...req.body
    });

    res.status(200).json(comment);
}

module.exports = {
    // getComments,
    createComment,
    deleteComment,
    updateComment,
    getBlogComment,
    // getComment
}