const express = require('express');
const blogRoutes = express.Router();
const { blogCtrl } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const { uploadImages } = require('../config/multer');

blogRoutes.get('/', blogCtrl.getAllBlogs);
blogRoutes.get('/:id', blogCtrl.getBlogById);
blogRoutes.post('/create', authenticateUser, uploadImages, blogCtrl.createBlog);
blogRoutes.patch('/update/:id', authenticateUser, uploadImages, blogCtrl.updateBlog);
blogRoutes.delete('/:id', authenticateUser, blogCtrl.deleteBlog);

module.exports = blogRoutes;