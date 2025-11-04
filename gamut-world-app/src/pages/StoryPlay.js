import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';

const StoryPlay = () => {
  const { story } = useParams();
  const navigate = useNavigate();
  const decodedStory = decodeURIComponent(story);

  const getStoryEmoji = (storyTitle) => {
    switch (storyTitle) {
      case "Making a New Friend": return "👫";
      case "Understanding Emotions": return "😊";
      case "Using My Voice": return "🗣️";
      case "Asking for Help": return "🙋";
      default: return "📖";
    }
  };

  const getStoryDescription = (storyTitle) => {
    switch (storyTitle) {
      case "Making a New Friend":
        return "Learn how to introduce yourself and make new friends with confidence!";
      case "Understanding Emotions":
        return "Discover different feelings and learn how to express them in healthy ways.";
      case "Using My Voice":
        return "Practice speaking clearly and confidently in different situations.";
      case "Asking for Help":
        return "Learn when and how to ask for help from friends, family, and teachers.";
      default:
        return "An exciting story to help you learn and grow!";
    }
  };

  return (
    <div className="page column-center">
      <div className="title">🎬 {decodedStory}</div>
      <div className="subtitle">Listen, read, and practice speaking!</div>
      
      {/* Video Player Placeholder */}
      <div className="video-player" style={{
        width: '100%',
        maxWidth: '600px',
        height: '300px',
        backgroundColor: '#f0f0f0',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '20px 0',
        border: '2px dashed #ccc'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>
          {getStoryEmoji(decodedStory)}
        </div>
        <div style={{ fontSize: '18px', textAlign: 'center', padding: '0 20px' }}>
          {getStoryDescription(decodedStory)}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          📹 Video would play here: {decodedStory}.mp4
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat 
        chatId="storyGuide"
        prompt="You are a friendly guide who helps kids understand feelings and practice speech gently."
        style={{ width: '90%', height: 250 }}
      />

      <button 
        className="btn btn-warning"
        onClick={() => navigate('/speech-practice')}
      >
        Next
      </button>
    </div>
  );
};

export default StoryPlay;