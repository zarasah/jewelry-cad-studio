const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const portfolioRoutes = require('./portfolioRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/portfolio', portfolioRoutes);

module.exports = router;