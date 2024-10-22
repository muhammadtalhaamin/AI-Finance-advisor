const mongoose = require('mongoose');

const financialAdviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  area: {
    type: String,
    enum: ['general', 'budgeting', 'investing', 'debt', 'savings'],
    default: 'general'
  },
  advice: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FinancialAdvice = mongoose.model('FinancialAdvice', financialAdviceSchema);

module.exports = FinancialAdvice;