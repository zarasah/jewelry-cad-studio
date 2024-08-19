const PortfolioModel = require("../models/PortfolioModel");
const categories = require('../common/enums/category.enum');
const fs = require('fs').promises;
const path = require('path');

async function getPortfolioByCategory(req, res) {
    try {
        const { category } = req.params;

        if (!categories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category', data: null });
        }

        const images = await PortfolioModel.find({ category })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Images retrieved successfully',
            data: images,
        });
    } catch (error) {
        console.error(`Error fetching images: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while fetching images', data: null });
    }
}

async function addPhotoToPortfolio(req, res) {
    try {
        const { category } = req.params;

        if (!categories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category', data: null });
        }

        const newImage = new PortfolioModel({
            category,
            filename: req.file.fullPath
        })

        await newImage.save();

        res.status(200).json({ message: 'Image added successfully', data: newImage });
    } catch (error) {
        console.error(`Error adding image: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while adding the image', data: null });
    }
}

async function removePhotoFromPortfolio(req, res) {
    try {
        const { category } = req.params;
        const { imageId } = req.body;

        if (!categories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category', data: null });
        }

        const portfolio = await PortfolioModel.findById(imageId);

        if (!portfolio || portfolio.category !== category) {
            return res.status(404).json({ message: 'Image not found or does not belong to the specified category', data: null });
        }

        const imagePath = path.join(__dirname, '..', portfolio.filename);

        await fs.unlink(imagePath);

        await PortfolioModel.findByIdAndDelete(imageId);

        res.status(200).json({ message: 'Image removed successfully', data: imageId});
    } catch (error) {
        console.error(`Error removing image: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while removing the image', data: null });
    }
}

module.exports = {
    getPortfolioByCategory,
    addPhotoToPortfolio,
    removePhotoFromPortfolio
}