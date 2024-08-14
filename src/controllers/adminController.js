const AdminModel = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

async function getAdmin(req, res) {
    try {
        const admin = await AdminModel.findOne().select('-password');

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found',
                data: null
            });
        }

        res.status(200).json({
            message: 'Profile retrieved successfully',
            data: admin
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching admin',
            data: null
        });
    }
}

async function updateAdmin(req, res) {
    try {
        const adminId =  req.user.id
        const admin = await AdminModel.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (req.body.firstName) admin.firstName = req.body.firstName;
        if (req.body.lastName) admin.lastName = req.body.lastName;
        if (req.body.email) admin.email = req.body.email;
        if (req.body.password) admin.password = await bcrypt.hash(req.body.password, 10);

        const updateAdmin = await admin.save();
        const {password, ...userData} = updateAdmin.toObject();

        res.status(200).json({ message: 'Admin data updated successfully', admin: userData });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updatePhoto(req, res) {
    try {
        const userId = req.user.id;
        const admin = await AdminModel.findById(userId).select('-password');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found', data: null });
        }

        if (admin.image) {
            const imagePath = path.join(__dirname, '..', admin.image);
            await fs.unlink(imagePath);
        }

        admin.image = req.file.fullPath;
        await admin.save();

        res.status(200).json({
            message: 'Profile photo updated successfully',
            data: admin
        });
    } catch(error) {
        res.status(500).json({
            message: 'An error occurred while updating the profile photo',
            data: null
        });
    }
}

async function deletePhoto(req, res) {
    try {
        const userId = req.user.id;
        const admin = await AdminModel.findById(userId).select('-password');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found', data: null });
        }

        if (admin.image) {
            const imagePath = path.join(__dirname, '..', admin.image);
            await fs.unlink(imagePath);

            admin.image = null;
            await admin.save();
        }

        res.status(200).json({
            message: 'Profile photo deleted successfully',
            data: admin
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting profile photo',
            data: null
        });
    }
}

module.exports = {
    getAdmin,
    updateAdmin,
    updatePhoto,
    deletePhoto,
}