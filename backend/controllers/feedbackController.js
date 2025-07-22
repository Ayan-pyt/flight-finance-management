const Feedback = require('../models/Feedback');

exports.leaveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({ ...req.body, user: req.user.id });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ flight: req.params.id }).populate('user', 'name');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

