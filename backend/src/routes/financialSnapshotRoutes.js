const express = require('express');
const financialSnapshotController = require('../controllers/financialSnapshotController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware); // Protect all routes

router.post('/', financialSnapshotController.createFinancialSnapshot);
router.get('/latest', financialSnapshotController.getUserLatestSnapshot);
router.get('/:id', financialSnapshotController.getFinancialSnapshot);
router.put('/:id', financialSnapshotController.updateFinancialSnapshot);
router.delete('/:id', financialSnapshotController.deleteFinancialSnapshot);

module.exports = router;