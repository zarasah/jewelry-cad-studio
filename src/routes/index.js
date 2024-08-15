const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const blogRoutes = require('./blogRoutes');
const teamMemberRoutes = require('./TeamMemberRoutes');
const footerSliderRoutes = require('./footerSliderRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/blog', blogRoutes);
router.use('/team', teamMemberRoutes);
router.use('/slider', footerSliderRoutes);

module.exports = router;