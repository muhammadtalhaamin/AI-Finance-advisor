require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

const mongoURI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI 
  : process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const adviceRoutes = require('./routes/advice');
app.use('/api/advice', adviceRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const financialSnapshotRoutes = require('./routes/financialSnapshotRoutes');
app.use('/api/financial-snapshots', financialSnapshotRoutes);

const financialAdviceRoutes = require('./routes/financialAdviceRoutes');
app.use('/api/financial-advice', financialAdviceRoutes);

const financialGoalRoutes = require('./routes/financialGoalRoutes');
app.use('/api/financial-goals', financialGoalRoutes);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

const onboardingRoutes = require('./routes/onboardingRoutes');
app.use('/api/onboarding', onboardingRoutes);


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
  
  module.exports = app;
