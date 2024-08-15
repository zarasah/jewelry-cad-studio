const express = require('express');
const adminRoutes = express.Router();
const { adminCtrl } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const upload = require('../config/multer');

adminRoutes.get('/', authenticateUser, adminCtrl.getAdmin);
adminRoutes.patch('/update', authenticateUser, adminCtrl.updateAdmin);
adminRoutes.patch('/photo', authenticateUser, upload.single('image'), adminCtrl.updatePhoto);
adminRoutes.delete('/photo', authenticateUser, adminCtrl.deletePhoto);

module.exports = adminRoutes;