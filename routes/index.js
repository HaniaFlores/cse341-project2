const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/isAuthenticated');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
   res.send(req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged out');
});

router.get('/profile', isAuthenticated, (req, res) => {
   res.json({
   message: 'Welcome to your profile!',
   user: req.session.user
   });
});

router.use('/users', require('./users.js'));
router.use('/tasks', require('./tasks.js'));
router.use('/auth', require('./auth'));

module.exports = router;