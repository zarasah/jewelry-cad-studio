const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const aboutUsRoutes = require('./aboutusRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/aboutus', aboutUsRoutes);
router.use('/blog', blogRoutes);

module.exports = router;