const express = require('express');
const { getFinancialAdvice, getAdviceHistory } = require('../controllers/financialAdviceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', getFinancialAdvice);
router.get('/history', getAdviceHistory);

module.exports = router;