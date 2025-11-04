import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Import page components
import Home from './pages/Home';
import ChooseStory from './pages/ChooseStory';
import StoryPlay from './pages/StoryPlay';
import SpeechPractice from './pages/SpeechPractice';
import EmotionCheck from './pages/EmotionCheck';
import ProgressPage from './pages/ProgressPage';
import RewardStore from './pages/RewardStore';
import ParentDashboard from './pages/ParentDashboard';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose-story" element={<ChooseStory />} />
          <Route path="/story-play/:story" element={<StoryPlay />} />
          <Route path="/speech-practice" element={<SpeechPractice />} />
          <Route path="/emotion-check" element={<EmotionCheck />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/reward-store" element={<RewardStore />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;