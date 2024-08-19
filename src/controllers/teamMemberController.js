const TeamMemberModel = require('../models/TeamMemberModel');
const fs = require('fs').promises;
const path = require('path');

async function getAllTeamMembers(req, res) {
    try {
        const members = await TeamMemberModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Team members retrieved successfully',
            data: members
        });
    } catch (error) {
        console.error(`Error fetching team members: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while fetching team members', data: null });
    }
}

async function getTeamMemberById(req, res) {
    try {
        const { id } = req.params;
        const member = await TeamMemberModel.findById(id);

        if (!member) {
            return res.status(404).json({ message: 'Team member not found', data: null });
        }

        res.status(200).json({
            message: 'Team member retrieved successfully',
            data: member
        });
    } catch (error) {
        console.error(`Error fetching team member: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while fetching the team member', data: null });
    }
}

async function createTeamMember(req, res) {
    try {
        const { fullName, role, content } = req.body;

        const teamMember = new TeamMemberModel({
            fullName,
            role,
            content,
            image: req.file ? req.file.fullPath : null,
        });

        await teamMember.save();

        res.status(201).json({
            message: 'Team member created successfully',
            data: teamMember
        });
    } catch (error) {
        console.error(`Error creating team member: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while creating the team member', data: null });
    }
}

async function updateTeamMember(req, res) {
    try {
        const { id } = req.params;
        const { fullName, role, content } = req.body;
        const image = req.file ? req.file.fullPath : null;

        const member = await TeamMemberModel.findById(id);

        if (!member) {
            return res.status(404).json({ message: 'Team member not found', data: null });
        }

        const updateFields = {};
        if (fullName !== undefined) {
            updateFields.fullName = fullName
        }

        if (role !== undefined) {
            updateFields.role = role
        }

        if (content !== undefined) {
            updateFields.content = content
        }

        if (image) {
            if (member.image) {
                await fs.unlink(path.join(__dirname, '..', member.image));
            }
            updateFields.image = image;
        }

        const updatedMember = await TeamMemberModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedMember) {
            return res.status(404).json({ message: 'Team member not found', data: null });
        }

        res.status(200).json({
            message: 'Team member updated successfully',
            data: updatedMember
        });
    } catch (error) {
        console.error(`Error updating team member: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while updating the team member', data: null });
    }
}

async function deleteTeamMember(req, res) {
    try {
        const { id } = req.params;

        const member = await TeamMemberModel.findById(id);

        if (!member) {
            return res.status(404).json({ message: 'Team member not found', data: null });
        }

        if (member.image) {
            const imagePath = path.join(__dirname, '..', member.image);

            try {
                await fs.unlink(imagePath);
            } catch (error) {
                console.error(`Error removing image: ${error.message}`);
            }
        }

        await TeamMemberModel.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Team member deleted successfully',
            data: id
        });
    } catch (error) {
        console.error(`Error deleting team member: ${error.message}`);
        res.status(500).json({ message: 'An error occurred while deleting the team member', data: null });
    }
}

module.exports = {
    getAllTeamMembers,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
}