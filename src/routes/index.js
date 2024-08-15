const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const aboutUsRoutes = require('./aboutusRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/aboutus', aboutUsRoutes);

module.exports = router;