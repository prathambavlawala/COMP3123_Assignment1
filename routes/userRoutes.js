const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        // Return success message with token
        res.status(200).json({
            message: 'Login successful',
            jwt_token: token
        });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
