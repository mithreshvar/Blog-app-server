const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({

    comment: {
        type: String,
        required: true
    },
    blog_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)