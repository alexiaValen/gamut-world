import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page column-center">
      <div className="title">👋 Welcome to SocialBuddy+!</div>
      <div className="subtitle">Learn emotions, conversation, and clear speech through fun stories!</div>
      
      <div className="button-container">
        <button 
          className="btn btn-success"
          onClick={() => navigate('/choose-story')}
        >
          Start Adventure
        </button>
        
        <button 
          className="btn btn-info"
          onClick={() => navigate('/progress')}
        >
          My Progress
        </button>
        
        <button 
          className="btn btn-purple"
          onClick={() => navigate('/parent-dashboard')}
        >
          Parent Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;