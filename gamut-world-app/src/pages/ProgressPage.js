import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProgressPage = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [animatePoints, setAnimatePoints] = useState(false);

  const badges = [
    { name: "Brave Speaker", emoji: "🗣️", earned: true, description: "Completed your first speech practice!" },
    { name: "Emotion Expert", emoji: "😊", earned: false, description: "Recognize 10 different emotions" },
    { name: "Kind Communicator", emoji: "💬", earned: false, description: "Complete 5 conversation practices" },
    { name: "Story Explorer", emoji: "📚", earned: true, description: "Watch your first story!" },
    { name: "Confidence Builder", emoji: "💪", earned: false, description: "Practice speaking for 30 minutes total" },
    { name: "Helper Hero", emoji: "🦸", earned: false, description: "Learn to ask for help effectively" }
  ];

  useEffect(() => {
    // Simulate loading points with animation
    const targetPoints = 85;
    let currentPoints = 0;
    const increment = targetPoints / 20;
    
    const pointsInterval = setInterval(() => {
      currentPoints += increment;
      if (currentPoints >= targetPoints) {
        setPoints(targetPoints);
        clearInterval(pointsInterval);
        setAnimatePoints(true);
        setTimeout(() => setAnimatePoints(false), 1000);
      } else {
        setPoints(Math.floor(currentPoints));
      }
    }, 50);

    return () => clearInterval(pointsInterval);
  }, []);

  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="page column-center">
      <div className="title">🏆 My Progress</div>
      <div className="subtitle">Look how much you've learned!</div>

      {/* Points Display */}
      <div className="progress-container" style={{ width: '90%' }}>
        <div className="subsection-title">Social Skill Points</div>
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          margin: '20px 0',
          animation: animatePoints ? 'pulse 0.5s ease-in-out' : 'none'
        }}>
          {points} ⭐
        </div>
        
        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '10px'
        }}>
          <div style={{
            width: `${Math.min(points, 100)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
            borderRadius: '10px',
            transition: 'width 0.5s ease-in-out'
          }}></div>
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {points}/100 points to next level
        </div>
      </div>

      {/* Earned Badges */}
      <div className="progress-container" style={{ width: '90%' }}>
        <div className="subsection-title">🎖️ Earned Badges</div>
        <div className="badge-list">
          {earnedBadges.map((badge, index) => (
            <div key={index} className="badge earned">
              <div className="emoji">{badge.emoji}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{badge.name}</div>
              <div style={{ fontSize: '12px' }}>{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges to Earn */}
      <div className="progress-container" style={{ width: '90%' }}>
        <div className="subsection-title">🎯 Badges to Earn</div>
        <div className="badge-list">
          {unearnedBadges.map((badge, index) => (
            <div key={index} className="badge">
              <div className="emoji" style={{ opacity: 0.5 }}>{badge.emoji}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', opacity: 0.7 }}>{badge.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="progress-container" style={{ width: '90%' }}>
        <div className="subsection-title">📊 Recent Activity</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
            <strong>🗣️ Speech Practice:</strong> Completed "Hello, my name is..." exercise
          </div>
          <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
            <strong>😊 Emotion Check:</strong> Successfully identified feeling "Happy"
          </div>
          <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
            <strong>📚 Story Time:</strong> Watched "Making a New Friend"
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button 
          className="btn btn-warning"
          onClick={() => navigate('/reward-store')}
        >
          🎁 Visit Reward Store
        </button>
        
        <button 
          className="btn btn-secondary mt-20"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;