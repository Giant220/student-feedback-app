const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedback
router.get('/', (req, res) => {
  Feedback.getAll((err, feedbacks) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(feedbacks);
  });
});

// POST new feedback
router.post('/', (req, res) => {
  const { studentName, courseCode, comments, rating } = req.body;

  // Validation
  if (!studentName || !courseCode || !comments || !rating) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const feedback = { studentName, courseCode, comments, rating };
  
  Feedback.create(feedback, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ 
      id: this.lastID,
      message: 'Feedback submitted successfully' 
    });
  });
});

// DELETE feedback
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  Feedback.delete(id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Feedback not found' });
      return;
    }
    res.json({ message: 'Feedback deleted successfully' });
  });
});

// GET dashboard stats
router.get('/stats', (req, res) => {
  Feedback.getStats((err, stats) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(stats);
  });
});

module.exports = router;