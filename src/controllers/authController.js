const AdminModel = require("../models/AdminModel");
const bcrypt = require('bcrypt');
const generateAccessToken = require('../helpers/generateAccessToken');

async function login(req, res) {
    try {
        const admin = await AdminModel.findOne({ email: req.body.email });

        if (!admin) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }


        const isPasswordValid = await bcrypt.compare(req.body.password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateAccessToken(admin.id, admin.email);
        const {password, ...adminData} = admin.toObject();

        res.status(200).json({ message: 'Login successful', token, admin: adminData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login,
}