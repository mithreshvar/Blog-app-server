const express = require("express");
const { getBlogs, createBlog, deleteBlog, updateBlog, getMyBlog, getBlog } = require("../controllers/blogController");
const requireAuth = require('../middleware/requireAuth')

const recordRoutes = express.Router();

// require auth for all workout routes
recordRoutes.use(requireAuth)

// GET all Blogs
recordRoutes.get('/', getBlogs);

// GET My Blog
recordRoutes.get('/my', getMyBlog);

// GET a Blog
recordRoutes.get('/:id', getBlog);

// POST a new Blog
recordRoutes.post('/', createBlog);

// DELETE a Blog
recordRoutes.delete('/:id', deleteBlog);

// UPDATE a Blog
recordRoutes.patch('/:id', updateBlog);

module.exports = recordRoutes;