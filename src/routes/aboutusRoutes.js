const express = require('express');
const aboutUsRoutes = express.Router();
const { aboutUsCtrl } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const {upload} = require('../config/multer');

aboutUsRoutes.get('/', aboutUsCtrl.getAboutUsPage);
aboutUsRoutes.post('/', authenticateUser, upload.single('image'), aboutUsCtrl.createOrUpdateAboutUsPage);
aboutUsRoutes.patch('/slider', authenticateUser, upload.single('image'), aboutUsCtrl.addImageToSlider);
aboutUsRoutes.delete('/slider/:imageId', authenticateUser, aboutUsCtrl.removeSliderImage);

module.exports = aboutUsRoutes;