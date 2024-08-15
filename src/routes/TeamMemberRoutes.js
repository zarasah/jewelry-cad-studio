const express = require('express');
const teamMemberRoutes = express.Router();
const { teamMemberCtrl } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');
const {upload} = require('../config/multer');

teamMemberRoutes.get('/', teamMemberCtrl.getAllTeamMembers);
teamMemberRoutes.get('/:id', authenticateUser, teamMemberCtrl.getTeamMemberById);
teamMemberRoutes.post('/', authenticateUser, upload.single('image'), teamMemberCtrl.createTeamMember);
teamMemberRoutes.patch('/:id', authenticateUser, upload.single('image'), teamMemberCtrl.updateTeamMember);
teamMemberRoutes.delete('/:id', authenticateUser, teamMemberCtrl.deleteTeamMember);

module.exports = teamMemberRoutes;