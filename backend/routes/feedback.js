const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedback
router.get('/', (req, res) => {
  try {
    const feedbacks = Feedback.getAll();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new feedback
router.post('/', (req, res) => {
  try {
    const { studentName, courseCode, comments, rating } = req.body;

    // Validation
    if (!studentName || !courseCode || !comments || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const result = Feedback.create({ studentName, courseCode, comments, rating: parseInt(rating) });
    res.status(201).json({ 
      id: result.lastInsertRowid,
      message: 'Feedback submitted successfully' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE feedback
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const result = Feedback.delete(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET dashboard stats
router.get('/stats', (req, res) => {
  try {
    const stats = Feedback.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;