const express = require('express');
const router = express.Router();

let feedbacks = [];
let idCounter = 1;

// POST /api/feedbacks – Save new feedback
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const feedback = {
    _id: idCounter++,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  feedbacks.unshift(feedback); // add to start for newest first
  res.status(201).json(feedback);
});

// GET /api/feedbacks – Get all feedbacks (newest first)
router.get('/', (req, res) => {
  res.status(200).json(feedbacks);
});

// DELETE /api/feedbacks/:id – Delete a feedback by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = feedbacks.findIndex(fb => fb._id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Feedback not found' });
  }
  feedbacks.splice(index, 1);
  res.json({ message: 'Feedback deleted' });
});

module.exports = router;