const express = require('express');
const authRoutes = express.Router();
const { authCtrl } = require('../controllers')

authRoutes.post('/login', authCtrl.login);

module.exports = authRoutes;