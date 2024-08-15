const BlogModel = require("../models/BlogModel");
const fs = require('fs').promises;
const path = require('path');

async function getAllBlogs(req, res) {
    try {
        const blogs = await BlogModel.find().exec();

        res.status(200).json({
            message: 'Blogs retrieved successfully',
            data: blogs
        });
    } catch (error) {
        console.error(`Error fetching blogs: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while fetching blogs', data: null });
    }
}

async function getBlogById(req, res) {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', data: null });
        }

        res.status(200).json({
            message: 'Blog retrieved successfully',
            data: blog
        });
    } catch (error) {
        console.error(`Error fetching blog by ID: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while fetching the blog', data: null });
    }
}

async function createBlog(req, res) {
    try {
        const {
            bannerText,
            text2,
            text3,
            text4,
            text5,
            textUnderImage2,
            textUnderImage3,
            textUnderImage4,
            textUnderImage5
        } = req.body;

        const blog = new BlogModel({
            bannerText,
            bannerImage: req.files['bannerImage'] ? req.files['bannerImage'][0].fullPath : null,
            imagesWithText: [
                { image: req.files['image2'] ? req.files['image2'][0].fullPath : null, text: textUnderImage2 || null },
                { image: req.files['image3'] ? req.files['image3'][0].fullPath : null, text: textUnderImage3 || null },
                { image: req.files['image4'] ? req.files['image4'][0].fullPath : null, text: textUnderImage4 || null },
                { image: req.files['image5'] ? req.files['image5'][0].fullPath : null, text: textUnderImage5 || null },
            ].filter(Boolean),
            text2: text2 || null,
            text3: text3 || null,
            text4: text4 || null,
            text5: text5 || null,
        });

        await blog.save();

        res.status(201).json({
            message: 'Blog created successfully',
            data: blog
        });
    } catch (error) {
        console.error(`Error creating blog: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while creating the blog', data: null });
    }
}

async function updateBlog(req, res) {
    try {
        const { id } = req.params;
        const {
            bannerText,
            text2,
            text3,
            text4,
            text5,
            textUnderImage2,
            textUnderImage3,
            textUnderImage4,
            textUnderImage5
        } = req.body;

        const updates = {};

        if (req.files['bannerImage']) {
            updates.bannerImage = req.files['bannerImage'][0].fullPath;
        }
        if (bannerText) updates.bannerText = bannerText;

        if (req.files['image2']) {
            updates.imagesWithText = updates.imagesWithText || [];
            updates.imagesWithText = updates.imagesWithText.map(img => img.image === req.files['image2'][0].fullPath ? { image: req.files['image2'][0].fullPath, text: textUnderImage2 || null } : img);
        }
        if (req.files['image3']) {
            updates.imagesWithText = updates.imagesWithText || [];
            updates.imagesWithText = updates.imagesWithText.map(img => img.image === req.files['image3'][0].fullPath ? { image: req.files['image3'][0].fullPath, text: textUnderImage3 || null } : img);
        }
        if (req.files['image4']) {
            updates.imagesWithText = updates.imagesWithText || [];
            updates.imagesWithText = updates.imagesWithText.map(img => img.image === req.files['image4'][0].fullPath ? { image: req.files['image4'][0].fullPath, text: textUnderImage4 || null } : img);
        }
        if (req.files['image5']) {
            updates.imagesWithText = updates.imagesWithText || [];
            updates.imagesWithText = updates.imagesWithText.map(img => img.image === req.files['image5'][0].fullPath ? { image: req.files['image5'][0].fullPath, text: textUnderImage5 || null } : img);
        }

        const blog = await BlogModel.findByIdAndUpdate(id, {
            $set: {
                bannerText: bannerText || undefined,
                bannerImage: updates.bannerImage || undefined,
                imagesWithText: updates.imagesWithText || undefined,
                text2: text2 || undefined,
                text3: text3 || undefined,
                text4: text4 || undefined,
                text5: text5 || undefined
            }
        }, { new: true });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', data: null });
        }

        res.status(200).json({
            message: 'Blog updated successfully',
            data: blog
        });
    } catch (error) {
        console.error(`Error updating blog: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while updating the blog', data: null });
    }
}

async function deleteBlog(req, res) {
    try {
        const { id } = req.params;

        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', data: null });
        }

        if (blog.bannerImage) {
            await fs.unlink(path.join(__dirname, '..', blog.bannerImage));
        }
        blog.imagesWithText.forEach(async img => {
            if (img.image) {
                await fs.unlink(path.join(__dirname, '..', img.image));
            }
        });

        await BlogModel.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Blog deleted successfully',
            data: id
        });
    } catch (error) {
        console.error(`Error deleting blog: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while deleting the blog', data: null });
    }
}


module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}