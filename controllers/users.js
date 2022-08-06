const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/User');

exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (!req.file) {
    errors.avatar = "Choose your avatar";
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.file.path
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);

    await newUser.save();

    res.json({ msg: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

exports.login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      errors.email = "Invalid user";
      return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      errors.password = "Invalid password";
      return res.status(400).json(errors);
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '1 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token: 'Bearer ' + token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}