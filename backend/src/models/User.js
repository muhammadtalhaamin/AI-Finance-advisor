const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  annualIncome: {
    type: Number,
    default: 0,
  },
  monthlyExpenses: {
    type: Map,
    of: Number,
    default: {},
  },
  currentSavings: {
    type: Number,
    default: 0,
  },
  financialGoals: [{
    type: String,
    enum: ['retirement', 'homePurchase', 'debtPayoff', 'investment', 'other'],
  }],
  riskTolerance: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre('save', async function(next) {
  if (this.isModified('password') && !this.password.startsWith('$2a$')) {
    console.log('Password modified and not hashed, hashing...');
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password after hashing:', this.password);
  } else {
    console.log('Password not modified or already hashed, skipping hashing');
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('Comparing passwords:');
  console.log('Candidate password:', candidatePassword);
  console.log('Stored hashed password:', this.password);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log('Password match result:', isMatch);
  return isMatch;
};

const User = mongoose.model('User', userSchema);

module.exports = User;