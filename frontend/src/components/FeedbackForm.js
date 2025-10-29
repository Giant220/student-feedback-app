import React, { useState } from 'react';

const FeedbackForm = ({ onFeedbackAdded }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    courseCode: '',
    comments: '',
    rating: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.courseCode.trim()) {
      newErrors.courseCode = 'Course code is required';
    }

    if (!formData.comments.trim()) {
      newErrors.comments = 'Comments are required';
    }

    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Feedback submitted successfully!');
        setFormData({
          studentName: '',
          courseCode: '',
          comments: '',
          rating: ''
        });
        setErrors({});
        
        // Notify parent component to refresh feedback list
        if (onFeedbackAdded) {
          onFeedbackAdded();
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ submit: data.error || 'Failed to submit feedback' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    }
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      courseCode: '',
      comments: '',
      rating: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="section">
      <h2>Submit Feedback</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
          />
          {errors.studentName && (
            <div className="error-message">{errors.studentName}</div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="courseCode"
            placeholder="Course Code (e.g., CS101)"
            value={formData.courseCode}
            onChange={handleChange}
          />
          {errors.courseCode && (
            <div className="error-message">{errors.courseCode}</div>
          )}
        </div>

        <div>
          <textarea
            name="comments"
            placeholder="Your comments about the course..."
            value={formData.comments}
            onChange={handleChange}
          />
          {errors.comments && (
            <div className="error-message">{errors.comments}</div>
          )}
        </div>

        <div>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          {errors.rating && (
            <div className="error-message">{errors.rating}</div>
          )}
        </div>

        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <div className="flex-row">
          <button type="submit">Submit Feedback</button>
          <button type="button" className="muted" onClick={handleReset}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;