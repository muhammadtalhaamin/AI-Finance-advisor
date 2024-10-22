const FinancialGoal = require('../models/FinancialGoal');
const User = require('../models/User');
const { generateGoalStrategy } = require('../utils/openai');

exports.createGoal = async (req, res) => {
  try {
    const { type, targetAmount, targetDate, currentAmount } = req.body;
    const user = await User.findById(req.user._id);

    const newGoal = new FinancialGoal({
      user: user._id,
      type,
      targetAmount,
      targetDate,
      currentAmount
    });

    const strategy = await generateGoalStrategy(user, newGoal);
    newGoal.strategy = strategy;

    newGoal.progress = (newGoal.currentAmount / newGoal.targetAmount) * 100;

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, targetAmount, targetDate, currentAmount } = req.body;
    const user = await User.findById(req.user._id);

    const updatedGoal = await FinancialGoal.findOneAndUpdate(
      { _id: id, user: user._id },
      { type, targetAmount, targetDate, currentAmount },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const strategy = await generateGoalStrategy(user, updatedGoal);
    updatedGoal.strategy = strategy;

    updatedGoal.progress = (updatedGoal.currentAmount / updatedGoal.targetAmount) * 100;

    await updatedGoal.save();

    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await FinancialGoal.find({ user: req.user._id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGoal = await FinancialGoal.findOneAndDelete({ _id: id, user: req.user._id });
    
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function generateStrategy(goal, user) {
  if (!user.onboardingCompleted) {
    return "Please complete the onboarding process to receive a personalized strategy.";
  }

  const monthsToGoal = (new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24 * 30);
  const monthlyContribution = (goal.targetAmount - goal.currentAmount) / monthsToGoal;

  let strategy = `To reach your ${goal.type} goal of $${goal.targetAmount.toLocaleString()} by ${new Date(goal.targetDate).toLocaleDateString()}, you need to save $${monthlyContribution.toFixed(2)} monthly. `;

  strategy += `
  
Recommendations:
1. Set up automatic transfers of $${monthlyContribution.toFixed(2)} to a dedicated savings account for this goal.
2. Look for ways to increase your income or reduce expenses to accelerate your progress.
3. Consider investing a portion of your savings if appropriate for your risk tolerance and time horizon.
4. Regularly review and adjust your strategy as your financial situation changes.`;

  return strategy;
}