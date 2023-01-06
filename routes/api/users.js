const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

const { register, login, loadUser } = require('../../controllers/users');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.get('/', isAuth, loadUser);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', login);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', isAuth, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
}
);

module.exports = router;
