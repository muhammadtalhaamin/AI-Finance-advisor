const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware); // Protect all routes

router.post('/send', chatController.sendMessage);
router.get('/history', chatController.getChatHistory);

module.exports = router;