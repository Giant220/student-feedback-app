import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackAdded = () => {
    // Increment key to trigger refresh in FeedbackList
    setRefreshKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'submit':
        return <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />;
      case 'view':
        return <FeedbackList refresh={refreshKey} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-area">
          <div className="brand">Student Feedback System</div>
        </div>
        <div className="nav-links">
          <a 
            href="#dashboard" 
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }}
          >
            Dashboard
          </a>
          <a 
            href="#submit" 
            className={currentView === 'submit' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentView('submit'); }}
          >
            Submit Feedback
          </a>
          <a 
            href="#view" 
            className={currentView === 'view' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setCurrentView('view'); }}
          >
            View Feedback
          </a>
        </div>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>Student Feedback Application &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;