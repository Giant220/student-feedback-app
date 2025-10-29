import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFeedback: 0,
    averageRating: 0,
    totalCourses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/feedback/stats');
        const data = await response.json();
        
        if (response.ok) {
          setStats({
            totalFeedback: data.totalFeedback || 0,
            averageRating: data.averageRating ? parseFloat(data.averageRating).toFixed(1) : 0,
            totalCourses: data.totalCourses || 0
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="section">Loading dashboard...</div>;
  }

  return (
    <div className="section">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-top">
        <div className="card">
          <h3>Total Feedback</h3>
          <p>{stats.totalFeedback}</p>
        </div>
        <div className="card">
          <h3>Average Rating</h3>
          <p>{stats.averageRating}/5</p>
        </div>
        <div className="card">
          <h3>Courses Rated</h3>
          <p>{stats.totalCourses}</p>
        </div>
      </div>
      
      <div className="section">
        <h3>Welcome to Student Feedback System</h3>
        <p>This application allows students to submit feedback for their courses and helps instructors understand student perspectives.</p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Features:</strong>
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Submit course feedback with ratings</li>
          <li>View all submitted feedback</li>
          <li>Monitor feedback statistics</li>
          <li>Manage feedback entries</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;