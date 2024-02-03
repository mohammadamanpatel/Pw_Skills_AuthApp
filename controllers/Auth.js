const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passwordUtils = require('../utils/passwordUtils');

router.post('/signup', require('../middleware/validationMiddleware'), async (req, res) => {
  try {
    const hashedPassword = await passwordUtils.hashPassword(req.body.password);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      bio: req.body.bio,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', require('../middleware/validationMiddleware'), async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await passwordUtils.verifyPassword(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token and set it to the cookie
    const token = passwordUtils.generateToken(user);
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
