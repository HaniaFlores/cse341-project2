const { body, validationResult } = require('express-validator');
const mongodb = require('../config/database.js');

const validateTask = [
    body('status')
        .isIn(['Pending', 'In-progress', 'Completed'])
        .withMessage('Status must be one of the following: Pending, In-progress, or Completed.'),

    body('priority')
        .isIn(['Low', 'Medium', 'High'])
        .withMessage('Priority must be Low, Medium, or High.'),

    body('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('Due date must be in YYYY-MM-DD format.'),

    body('category')
        .isIn(['Work', 'Personal', 'School', 'Other'])
        .withMessage('Category must be one of the following: Work, Personal, School, or Other.'),

    body('assignedUser')
        .custom(async (value) => {
            const nameParts = value.trim().split(/\s+/);
            if (nameParts.length !== 2) {
                throw new Error('Assigned user must contain exactly a first name and a last name.');
            }

            const [firstName, lastName] = nameParts;

            const db = mongodb.getDatabase();
            const user = await db.db().collection('users').findOne({ firstName, lastName });

            if (!user) {
                throw new Error(`User with name "${firstName} ${lastName}" not found. Please create a user first`);
            }

            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
        next();
    }
];

module.exports = {
    validateTask
};
