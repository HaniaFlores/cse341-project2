const mongodb = require('../config/database');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const createUser = async (req, res) => {
/**
 * #swagger.tags = ['Users']
 * #swagger.description = 'This endpoint creates a new user.'
*/
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            // createdAt: new Date()
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        res.status(201).json({ message: 'Contact created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Some error occurred while creating the user.'});
    }
};

const getAllUsers = async (req, res) => {
/**
 * #swagger.tags = ['Users']
 *  #swagger.description = 'This endpoint gets all users. (Auth required)'
*/
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        const safeUsers = users.map(({ password, ...rest }) => rest);
        res.status(200).json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching users.' });
    }
};

const getSingleUser = async (req, res) => {
/**
 * #swagger.tags = ['Users']
 *  #swagger.description = 'Gets a user by ID. (Auth required)'
*/
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password, ...safeUser } = user;
        res.status(200).json(safeUser);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching user.' });
    }
};

const updateUser = async (req, res) => {
/**
 * #swagger.tags = ['Users']
 * #swagger.description = 'Updates user information. (Auth required)'
*/
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };

        if (req.body.password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        const response = await mongodb.getDatabase().db().collection('users').updateOne({ _id: userId }, { $set: user });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error updating user.' });
    }
};

const deleteUser = async (req, res) => {
/**
 * #swagger.tags = ['Users']
 * #swagger.description = 'Deletes a user. (Auth required)'
*/
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error deleting user.' });
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
