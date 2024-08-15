const AboutUsModel = require('../models/AboutusModel');
const fs = require('fs').promises;
const path = require('path');

async function getAboutUsPage(req, res) {
    try {
        const aboutUs = await AboutUsModel.findOne();

        if (!aboutUs) {
            return res.status(404).json({ message: 'About Us content not found', data: null });
        }

        res.status(200).json({ message: 'About Us content retrieved successfully', data: aboutUs });
    } catch (error) {
        console.error(`Error fetching About Us content: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while fetching the content', data: null });
    }
}

async function createOrUpdateAboutUsPage(req, res) {
    try {
        const { text1, text2 } = req.body;
        const headerImage = req.file ? req.file.fullPath : null;

        let aboutUs = await AboutUsModel.findOne();

        if (aboutUs) {
            if (headerImage) {
                if (aboutUs.headerImage) {
                    const oldImagePath = path.join(__dirname, '..', aboutUs.headerImage);
                    try {
                        await fs.unlink(oldImagePath);
                    } catch (error) {
                        console.error(`Error removing old header image: ${error.message}`);
                    }
                }

                aboutUs.headerImage = headerImage;
            }
            if (text1) {
                aboutUs.text1 = text1;
            }
            if (text2) {
                aboutUs.text2 = text2;
            }
        } else {
            aboutUs = new AboutUsModel({
                headerImage,
                text1,
                text2
            });
        }

        await aboutUs.save();

        res.status(200).json({
            message: 'About Us page updated successfully',
            data: aboutUs
        });
    } catch (error) {
        console.error(`Error updating About Us page: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while updating the About Us page', data: null });
    }
}

async function addImageToSlider(req, res) {
    try {
        const sliderImage = { filename: req.file.fullPath };

        let aboutUs = await AboutUsModel.findOne();

        if (!aboutUs) {
            aboutUs = new AboutUsModel({
                sliderImages: [sliderImage],
                headerImage: '',
                text1: '',
                text2: '',
            });
        } else {
            aboutUs.sliderImages.push(sliderImage);
        }

        await aboutUs.save();

        res.status(200).json({
            message: 'Slider image uploaded successfully',
            data: aboutUs.sliderImages,
        });
    } catch (error) {
        console.error(`Error uploading slider image: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while uploading the slider image', data: null });
    }
}

async function removeSliderImage(req, res) {
    try {
        const { imageId } = req.params;

        const aboutUs = await AboutUsModel.findOne();

        if (!aboutUs) {
            return res.status(404).json({ message: 'About Us page not found', data: null });
        }

        const imageIndex = aboutUs.sliderImages.findIndex(image => image._id.toString() === imageId);

        if (imageIndex === -1) {
            return res.status(404).json({ message: 'Image not found in the slider', data: null });
        }

        const [removedImage] = aboutUs.sliderImages.splice(imageIndex, 1);

        const imagePath = path.join(__dirname, '..', removedImage.filename);
        await fs.unlink(imagePath);

        await aboutUs.save();

        res.status(200).json({
            message: 'Slider image removed successfully',
            data: aboutUs.sliderImages
        });
    } catch (error) {
        console.error(`Error removing slider image: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while removing the slider image', data: null });
    }

    // try {
    //     const { imageId } = req.params;
    //
    //     const aboutUs = await AboutUsModel.findOne();
    //
    //     if (!aboutUs) {
    //         return res.status(404).json({ message: 'About Us page not found', data: null });
    //     }
    //
    //     const imageIndex = aboutUs.sliderImages.findIndex(image => image._id.toString() === imageId);
    //
    //     if (imageIndex === -1) {
    //         return res.status(404).json({ message: 'Image not found in the slider', data: null });
    //     }
    //
    //     const [removedImage] = aboutUs.sliderImages.splice(imageIndex, 1);
    //
    //     const imagePath = path.join(__dirname, '..', removedImage.filename);
    //     await fs.unlink(imagePath);
    //
    //     await aboutUs.save();
    //
    //     res.status(200).json({
    //         message: 'Slider image removed successfully',
    //         data: aboutUs.sliderImages
    //     });
    // } catch (error) {
    //     console.error(`Error removing slider image: ${error.message}`);
    //     res.status(500).json({ message: 'An error occurred while removing the slider image', data: null });
    // }
}

module.exports = {
    getAboutUsPage,
    createOrUpdateAboutUsPage,
    addImageToSlider,
    removeSliderImage
}