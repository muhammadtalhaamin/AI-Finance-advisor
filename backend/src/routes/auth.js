const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'EMAIL_EXISTS', message: 'This email is already registered' });
    }

    const user = new User({ username, email, password });
    await user.save();
    console.log('User registered:', user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'REGISTRATION_FAILED', message: 'Registration failed' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ error: 'EMAIL_NOT_FOUND', message: 'This email is not registered' });
    }
    console.log('User found:', user);
    console.log('Stored hashed password:', user.password);
    console.log('Provided password:', password);
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch for user:', user.email);
      return res.status(400).json({ error: 'INVALID_PASSWORD', message: 'Incorrect password' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Login successful for user:', user.email);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
        annualIncome: user.annualIncome,
        monthlyExpenses: user.monthlyExpenses,
        currentSavings: user.currentSavings,
        financialGoals: user.financialGoals,
        riskTolerance: user.riskTolerance
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'LOGIN_FAILED', message: 'Login failed' });
  }
});

module.exports = router;