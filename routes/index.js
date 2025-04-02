const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
   res.send('Welcome to the To-Do App.');
});

router.use('/users', require('./users.js'));
router.use('/tasks', require('./tasks.js'));

module.exports = router;