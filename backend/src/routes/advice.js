const express = require('express');
const { generateFinancialAdvice } = require('../utils/openai');

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const advice = await generateFinancialAdvice(prompt);
    res.json({ advice });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate advice' });
  }
});

module.exports = router;