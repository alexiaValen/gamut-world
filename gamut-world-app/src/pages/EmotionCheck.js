import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmotionCheck = () => {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const emotions = [
    { name: 'Happy', emoji: '😊', color: '#FFD166' },
    { name: 'Excited', emoji: '🤩', color: '#69C9D0' },
    { name: 'Proud', emoji: '😌', color: '#CDB4DB' },
    { name: 'Nervous', emoji: '😰', color: '#FF9800' },
    { name: 'Confused', emoji: '😕', color: '#9E9E9E' },
    { name: 'Calm', emoji: '😌', color: '#4CAF50' },
    { name: 'Frustrated', emoji: '😤', color: '#F44336' },
    { name: 'Curious', emoji: '🤔', color: '#2196F3' }
  ];

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubmitEmotion = () => {
    if (selectedEmotion) {
      setShowMessage(true);
      // Simulate adding points
      setTimeout(() => {
        alert("Great job recognizing your feelings! 🌟 You earned 10 points!");
        navigate('/progress');
      }, 2000);
    } else {
      alert("Please select how you're feeling first!");
    }
  };

  return (
    <div className="page column-center">
      <div className="title">How did that feel?</div>
      <div className="subtitle">Choose the emotion that best describes how you're feeling right now</div>

      <div className="emotion-detector">
        <div className="emotion-options">
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className={`emotion-option ${selectedEmotion?.name === emotion.name ? 'selected' : ''}`}
              onClick={() => handleEmotionSelect(emotion)}
              style={{
                borderColor: selectedEmotion?.name === emotion.name ? emotion.color : 'var(--accent-color)',
                backgroundColor: selectedEmotion?.name === emotion.name ? emotion.color : 'white',
                color: selectedEmotion?.name === emotion.name ? 'white' : 'var(--text-dark)'
              }}
            >
              <div className="emoji">{emotion.emoji}</div>
              <div>{emotion.name}</div>
            </div>
          ))}
        </div>

        {selectedEmotion && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f0f8ff',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>
              You selected: <strong>{selectedEmotion.name}</strong> {selectedEmotion.emoji}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              It's perfectly normal to feel this way! Recognizing our emotions is an important skill.
            </div>
          </div>
        )}
      </div>

      {showMessage && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '15px',
          textAlign: 'center',
          border: '2px solid #4CAF50'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🌟</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4CAF50' }}>
            Excellent emotional awareness!
          </div>
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            You're learning to understand your feelings better!
          </div>
        </div>
      )}

      <button 
        className="btn btn-deep-purple mt-20"
        onClick={handleSubmitEmotion}
        disabled={!selectedEmotion}
        style={{
          opacity: selectedEmotion ? 1 : 0.6,
          cursor: selectedEmotion ? 'pointer' : 'not-allowed'
        }}
      >
        Submit Emotion
      </button>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        💡 Tip: There are no wrong answers! All feelings are valid and important.
      </div>
    </div>
  );
};

export default EmotionCheck;