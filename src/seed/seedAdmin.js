const mongoose = require('mongoose');
const AdminModel = require('../models/AdminModel');
const connectDB = require('../config/db');
const bcrypt = require('bcrypt');

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await AdminModel.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = new AdminModel({
            email: 'admin@example.com',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedAdmin();
