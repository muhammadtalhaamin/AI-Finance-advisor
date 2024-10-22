const mongoose = require('mongoose');

const financialSnapshotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Map,
    of: Number,
    required: true
  },
  savings: {
    type: Number,
    required: true
  },
  investments: {
    type: Map,
    of: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FinancialSnapshot = mongoose.model('FinancialSnapshot', financialSnapshotSchema);

module.exports = FinancialSnapshot;