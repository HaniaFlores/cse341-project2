const mongodb = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const createUser = async (req, res) => {
    /** #swagger.tags = ['Users'] */
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            // createdAt: new Date()
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        res.status(201).json({ message: 'Contact created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Some error occurred while creating the user.'});
    }
};

const getAllUsers = async (req, res) => {
    /** #swagger.tags = ['Users'] */
    const response = await mongodb.getDatabase().db().collection('users').find();
    response.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingleUser = async (req, res) => {
    /** #swagger.tags = ['Users'] */
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    response.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const updateUser = async (req, res) => {
    /** #swagger.tags = ['Users'] */
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        // createdAt: new Date()
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);

    if(response.modifiedCount > 0) {
        res.status(200).json({ message: 'User updated successfully' });
    }else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    /** #swagger.tags = ['Users'] */
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

    if(response.deletedCount > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
    }else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
