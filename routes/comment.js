const express = require("express");
const { createComment, deleteComment, updateComment, getBlogComment } = require("../controllers/commentController");
const requireAuth = require('../middleware/requireAuth')

const recordRoutes = express.Router();

// require auth for all workout routes
recordRoutes.use(requireAuth)

// // GET all comments
// recordRoutes.get('/', getBlogs);

// // GET My comment
// recordRoutes.get('/my', getMyBlog);

// GET a comment
recordRoutes.get('/:blog_id', getBlogComment);

// POST a new comment
recordRoutes.post('/:blog_id', createComment);

// DELETE a comment
recordRoutes.delete('/:id', deleteComment);

// UPDATE a comment
recordRoutes.patch('/:id', updateComment);

module.exports = recordRoutes;