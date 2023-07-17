const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

//  get all Blogs
const getBlogs = async (req, res) => {

    const blog = await Blog.find({}).sort({ createdAt: -1 });

    res.status(200).json(blog);
}

//  get Blog
const getBlog = async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ error: "No such blog" });
    }
    res.status(200).json(blog);
}

//  get my Blog
const getMyBlog = async (req, res) => {
    const user_id = req.user._id

    try{
        const blog = await Blog.find({ user_id:user_id }).sort({ createdAt: -1 });
    
        if (!blog) {
            return res.status(404).json({ error: "No such user" });
        }
        res.status(200).json(blog);
    }
    catch(err) {
        console.log(err.message)
    }
}

// create a Blog
const createBlog = async (req, res) => {
    const user_id = req.user._id
    const userName = req.user.userName
    console.log(req.user)
    const { title, content } = req.body; //tags,

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!content) {
        emptyFields.push('content')
    }
    // if (!tags) {
    //     emptyFields.push('tags')
    // }
    if (!userName) {
        emptyFields.push('userName')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Missing Fields', emptyFields })
    }

    // add doc to db
    try {

        const blog = await Blog.create({ title, content, user_id, userName }); //tags,
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a Blog
const deleteBlog = async (req, res) => {
    const user_id = req.user._id
    const { id } = req.params;

    // validating id to prevent server crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such blog" })
    }

    const blog = await Blog.findOne({ _id: id });
    
    if (!blog) {
        return res.status(404).json({ error: "No such blog" });
    }

    if (blog.user_id != user_id) {
        return res.status(401).json({ error: "access denied" })
    }
    
    await Blog.deleteOne({ _id: id })

    res.status(200).json(blog);
}

// update a Blog
const updateBlog = async (req, res) => {
    const user_id = req.user._id
    const { id } = req.params;

    // validating id to prevent server crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such blog" })
    }

    let blog = await Blog.findOne({ _id: id });
    
    if (!blog) {
        return res.status(404).json({ error: "No such blog" });
    }

    if (blog.user_id != user_id) {
        return res.status(401).json({ error: "access denied" })
    }

    blog = await Blog.findOneAndUpdate({ _id:id }, {
        ...req.body
    });

    res.status(200).json(blog);
}

module.exports = {
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
    getMyBlog,
    getBlog
}