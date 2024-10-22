const FinancialAdvice = require('../models/FinancialAdvice');
const User = require('../models/User');
const { generatePersonalizedFinancialAdvice } = require('../utils/openai');

exports.getFinancialAdvice = async (req, res) => {
  try {
    const { question, area } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const advice = await generatePersonalizedFinancialAdvice(user, question, area);

    const newAdvice = new FinancialAdvice({
      user: user._id,
      question,
      area,
      advice
    });

    await newAdvice.save();

    res.json({ advice });
  } catch (error) {
    console.error('Error generating financial advice:', error);
    res.status(500).json({ message: 'Error generating financial advice' });
  }
};

exports.getAdviceHistory = async (req, res) => {
  try {
    const adviceHistory = await FinancialAdvice.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(adviceHistory);
  } catch (error) {
    console.error('Error fetching advice history:', error);
    res.status(500).json({ message: 'Error fetching advice history' });
  }
};