const Chat = require('../models/Chat');
const User = require('../models/User');
const { generateChatResponse, generatePersonalizedFinancialAdvice } = require('../utils/openai');

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const user = req.user; // Assuming the user object is attached to the request by the auth middleware

    let chat = await Chat.findOne({ user: user._id });
    if (!chat) {
      chat = new Chat({ user: user._id, messages: [] });
    }

    chat.messages.push({ role: 'user', content: message });

    let aiResponse;

    if (!user.onboardingCompleted) {
      aiResponse = "Please complete your onboarding to receive personalized financial advice. You can navigate to the onboarding page from your profile.";
    } else {
      // Use personalized financial advice generation if user completed onboarding
      aiResponse = await generatePersonalizedFinancialAdvice(user, message, "general");
    }

    chat.messages.push({ role: 'assistant', content: aiResponse });
    await chat.save();

    res.status(200).json({
      status: 'success',
      data: {
        message: aiResponse
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


exports.getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ user: req.user._id });

    if (!chat) {
      return res.status(404).json({
        status: 'fail',
        message: 'No chat history found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        chatHistory: chat.messages
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};