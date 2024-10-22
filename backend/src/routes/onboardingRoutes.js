const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/complete', authMiddleware, async (req, res) => {
  try {
    const { annualIncome, monthlyExpenses, currentSavings, financialGoals, riskTolerance } = req.body;

    // Data validation
    if (typeof annualIncome !== 'number' || annualIncome < 0) {
      return res.status(400).json({ error: 'Invalid annual income' });
    }

    if (typeof currentSavings !== 'number' || currentSavings < 0) {
      return res.status(400).json({ error: 'Invalid current savings' });
    }

    if (!['low', 'medium', 'high'].includes(riskTolerance)) {
      return res.status(400).json({ error: 'Invalid risk tolerance' });
    }

    // Validate monthlyExpenses
    if (typeof monthlyExpenses !== 'object') {
      return res.status(400).json({ error: 'Invalid monthly expenses' });
    }
    for (const [key, value] of Object.entries(monthlyExpenses)) {
      if (typeof value !== 'number' || value < 0) {
        return res.status(400).json({ error: `Invalid expense value for ${key}` });
      }
    }

    // Validate financialGoals
    const validGoals = ['retirement', 'homePurchase', 'debtPayoff', 'investment', 'other'];
    if (!Array.isArray(financialGoals) || !financialGoals.every(goal => validGoals.includes(goal))) {
      return res.status(400).json({ error: 'Invalid financial goals' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        annualIncome,
        monthlyExpenses,
        currentSavings,
        financialGoals,
        riskTolerance,
        onboardingCompleted: true
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        annualIncome: updatedUser.annualIncome,
        monthlyExpenses: updatedUser.monthlyExpenses,
        currentSavings: updatedUser.currentSavings,
        financialGoals: updatedUser.financialGoals,
        riskTolerance: updatedUser.riskTolerance,
        onboardingCompleted: updatedUser.onboardingCompleted
      }
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'An error occurred during onboarding' });
  }
});

module.exports = router;