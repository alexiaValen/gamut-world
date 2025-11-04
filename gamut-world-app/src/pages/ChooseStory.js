import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseStory = () => {
  const navigate = useNavigate();

  const stories = [
    { title: "Making a New Friend", emoji: "👫", image: "friend.png" },
    { title: "Understanding Emotions", emoji: "😊", image: "emotions.png" },
    { title: "Using My Voice", emoji: "🗣️", image: "voice.png" },
    { title: "Asking for Help", emoji: "🙋", image: "help.png" }
  ];

  const handleStoryClick = (story) => {
    navigate(`/story-play/${encodeURIComponent(story.title)}`);
  };

  return (
    <div className="page scroll">
      <div className="section-title">Pick your story:</div>
      
      <div className="story-list">
        {stories.map((story, index) => (
          <div 
            key={index}
            className="story-card"
            onClick={() => handleStoryClick(story)}
          >
            <div className="emoji">{story.emoji}</div>
            <h3>{story.title}</h3>
          </div>
        ))}
      </div>

      <button 
        className="btn btn-secondary mt-20"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ChooseStory;