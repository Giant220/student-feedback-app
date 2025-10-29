import React, { useState, useEffect } from 'react';

const FeedbackList = ({ refresh }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/feedback');
      const data = await response.json();
      
      if (response.ok) {
        setFeedbacks(data);
        setError('');
      } else {
        setError('Failed to fetch feedbacks');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`/api/feedback/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Refresh the list after deletion
          fetchFeedbacks();
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to delete feedback');
        }
      } catch (error) {
        alert('Network error. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refresh]);

  if (loading) {
    return <div className="section">Loading feedbacks...</div>;
  }

  return (
    <div className="section">
      <h2>Recent Feedback</h2>
      {error && (
        <div className="error-message" style={{ padding: '1rem' }}>{error}</div>
      )}
      
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course Code</th>
                <th>Comments</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.studentName}</td>
                  <td>{feedback.courseCode}</td>
                  <td>{feedback.comments}</td>
                  <td className="rating">
                    {feedback.rating}/5
                  </td>
                  <td>
                    <div className="actions">
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(feedback.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;