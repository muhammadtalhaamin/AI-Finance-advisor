const FinancialSnapshot = require('../models/FinancialSnapshot');

exports.createFinancialSnapshot = async (req, res) => {
  try {
    const newSnapshot = await FinancialSnapshot.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json({
      status: 'success',
      data: {
        snapshot: newSnapshot
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getFinancialSnapshot = async (req, res) => {
  try {
    const snapshot = await FinancialSnapshot.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!snapshot) {
      return res.status(404).json({
        status: 'fail',
        message: 'No snapshot found with that ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        snapshot
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateFinancialSnapshot = async (req, res) => {
  try {
    const snapshot = await FinancialSnapshot.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!snapshot) {
      return res.status(404).json({
        status: 'fail',
        message: 'No snapshot found with that ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        snapshot
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteFinancialSnapshot = async (req, res) => {
  try {
    const snapshot = await FinancialSnapshot.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!snapshot) {
      return res.status(404).json({
        status: 'fail',
        message: 'No snapshot found with that ID'
      });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getUserLatestSnapshot = async (req, res) => {
  try {
    const snapshot = await FinancialSnapshot.findOne({ user: req.user._id })
      .sort('-createdAt')
      .limit(1);
    if (!snapshot) {
      return res.status(404).json({
        status: 'fail',
        message: 'No snapshots found for this user'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        snapshot
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
