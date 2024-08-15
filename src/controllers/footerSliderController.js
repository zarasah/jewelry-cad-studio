const FooterSliderModel = require('../models/FooterSliderModel');
const fs = require('fs').promises;
const path = require('path');

async function getImages(req, res) {
    try {
        const footerSliderImages = await FooterSliderModel.find();

        res.status(200).json({
            message: 'Footer slider images retrieved successfully',
            data: footerSliderImages
        });
    } catch (error) {
        console.error(`Error retrieving footer slider images: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while retrieving the footer slider images', data: null });
    }
}

async function createImage(req, res) {
    try {
        const image = req.file ? req.file.fullPath : null;

        if (!image) {
            return res.status(400).json({ message: 'Image is required', data: null });
        }

        const footerSlider = new FooterSliderModel({ image });
        await footerSlider.save();

        res.status(201).json({
            message: 'Footer slider image uploaded successfully',
            data: footerSlider
        });
    } catch (error) {
        console.error(`Error uploading footer slider image: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while uploading the footer slider image', data: null });
    }
}

async function removeImage(req, res) {
    try {
        const { id } = req.params;

        const footerSlider = await FooterSliderModel.findById(id);

        if (!footerSlider) {
            return res.status(404).json({ message: 'Footer slider image not found', data: null });
        }

        const imagePath = path.join(__dirname, '..', footerSlider.image);

        try {
            await fs.unlink(imagePath);
        } catch (error) {
            console.error(`Error deleting image file: ${error.message}`);
        }

        await FooterSliderModel.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Footer slider image deleted successfully',
            data: id
        });
    } catch (error) {
        console.error(`Error deleting footer slider image: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while deleting the footer slider image', data: null });
    }
}


module.exports = {
    getImages,
    createImage,
    removeImage
}