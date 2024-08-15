const express = require('express');
const footerSliderRoutes = express.Router();
const { footerSliderCtrl } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const {upload} = require('../config/multer');

footerSliderRoutes.get('/', footerSliderCtrl.getImages);
footerSliderRoutes.post('/', authenticateUser, upload.single('image'), footerSliderCtrl.createImage);
footerSliderRoutes.delete('/:id', authenticateUser, footerSliderCtrl.removeImage);

module.exports = footerSliderRoutes;