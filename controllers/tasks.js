const mongodb = require('../config/database.js');
const ObjectId = require('mongodb').ObjectId;

const createTask = async (req, res) => {
/**
 * #swagger.tags = ['Tasks']
 * #swagger.description = 'This endpoint creates a new task.'
*/
    try {
        const task = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status,
            category: req.body.category,
            assignedUser: req.body.assignedUser,
            createdAt: new Date()
        };
        const response = await mongodb.getDatabase().db().collection('tasks').insertOne(task);
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Some error occurred while updating the task.'});
    }
};

const getAllTasks = async (req, res) => {
/**
 * #swagger.tags = ['Tasks']
 * #swagger.description = 'This endpoint gets all tasks from the database.'
*/
    const response = await mongodb.getDatabase().db().collection('tasks').find();
    response.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

const getSingleTask = async (req, res) => {
/**
 * #swagger.tags = ['Tasks']
 * #swagger.description = 'This endpoint gets a task by id.'
*/
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tasks').find({_id: taskId});
    response.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks[0]);
    });
};

const updateTask = async (req, res) => {
/**
 * #swagger.tags = ['Tasks']
 * #swagger.description = 'This endpoint updates a task.'
*/
    try {
        const taskId = new ObjectId(req.params.id);
        const task = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status,
            category: req.body.category,
            assignedUser: req.body.assignedUser
        };

        const response = await mongodb.getDatabase().db().collection('tasks').replaceOne({ _id: taskId }, task);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ message: 'Task not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Some error occurred while updating the task.' });
    }
};

const deleteTask = async (req, res) => {
/**
 * #swagger.tags = ['Tasks']
 * #swagger.description = 'This endpoint deletes a task.'
*/
    try {
        const taskId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({ _id: taskId });
        res.status(204).send().json({message: 'Contact deleted successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message || 'Some error occurred while deleting the user.' });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
}
