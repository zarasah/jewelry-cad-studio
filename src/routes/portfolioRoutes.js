const express = require('express');
const portfolioRoutes = express.Router();
const { portfolioCtrl } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const upload = require('../config/multer');

portfolioRoutes.get('/:category', portfolioCtrl.getPortfolioByCategory);
portfolioRoutes.post('/:category', authenticateUser, upload.single('image'), portfolioCtrl.addPhotoToPortfolio);
portfolioRoutes.delete('/:category', authenticateUser, portfolioCtrl.removePhotoFromPortfolio);

module.exports = portfolioRoutes;