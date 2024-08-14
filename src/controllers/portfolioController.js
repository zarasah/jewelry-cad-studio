const PortfolioModel = require("../models/PortfolioModel");
const categories = require('../common/enums/category.enum');
const fs = require('fs').promises;
const path = require('path');

async function getPortfolioByCategory(req, res) {
    try {
        const { category } = req.params;
        const portfolio = await PortfolioModel.findOne({ category });

        if (!portfolio) {
            return res.status(404).json({ message: 'Category not found', data: null });
        }

        res.status(200).json({ message: 'Images retrieved successfully', data: portfolio.images });
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

        let portfolio = await PortfolioModel.findOne({ category });

        if (!portfolio) {
            portfolio = new PortfolioModel({ category, images: [] });
        }

        portfolio.images.push({ filename: req.file.fullPath });

        await portfolio.save();

        res.status(200).json({ message: 'Image added successfully', data: portfolio.images });
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

        const portfolio = await PortfolioModel.findOne({ category });

        if (!portfolio) {
            return res.status(404).json({ message: 'Category not found', data: null });
        }

        const image = portfolio.images.id(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found', data: null });
        }

        const imagePath = path.join(__dirname, '..', image.filename);

        await fs.unlink(imagePath);

        portfolio.images.pull(imageId);

        await portfolio.save();

        res.status(200).json({ message: 'Image removed successfully', data: portfolio.images });
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