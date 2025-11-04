import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecorder from '../components/SpeechRecorder';

const SpeechPractice = () => {
  const navigate = useNavigate();
  const [speechAnalysis, setSpeechAnalysis] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const practicePhrase = "Hello, my name is...";

  const handleRecordingComplete = (audioBlob) => {
    // Simulate speech analysis
    setTimeout(() => {
      const mockAnalysis = {
        clarity: Math.random() * 40 + 60, // 60-100%
        confidence: Math.random() * 30 + 70, // 70-100%
        feedback: generateFeedback()
      };
      setSpeechAnalysis(mockAnalysis);
    }, 1500);
  };

  const generateFeedback = () => {
    const feedbacks = [
      "Great job! Your pronunciation is getting clearer.",
      "Nice effort! Remember to speak slowly and clearly.",
      "Wonderful! You're building confidence with each try.",
      "Keep practicing! You're doing better each time.",
      "Excellent work! Your speech is improving."
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const handleSubmitPractice = () => {
    setShowFeedback(true);
    // Simulate processing time
    setTimeout(() => {
      alert("Nice effort! Remember: taking your time is part of learning 💖");
    }, 1000);
  };

  const playPrompt = () => {
    // Simulate AI voice prompt
    const utterance = new SpeechSynthesisUtterance(practicePhrase);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="page column-center">
      <div className="title">🗣️ Let's Practice Speaking!</div>
      <div className="subtitle">Repeat after me, take your time!</div>

      {/* AI Voice Prompt */}
      <div className="progress-container" style={{ width: '90%', textAlign: 'center' }}>
        <div className="subsection-title">Practice Phrase:</div>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'var(--primary-color)',
          margin: '15px 0'
        }}>
          "{practicePhrase}"
        </div>
        <button 
          className="btn btn-info"
          onClick={playPrompt}
        >
          🔊 Listen to Example
        </button>
      </div>

      {/* Speech Recorder */}
      <SpeechRecorder 
        recorderId="childSpeech"
        maxDuration={10}
        onRecordingComplete={handleRecordingComplete}
      />

      {/* Speech Analysis Feedback */}
      {speechAnalysis && (
        <div className="progress-container" style={{ width: '90%' }}>
          <div className="subsection-title">📊 Speech Analysis</div>
          
          <div style={{ margin: '15px 0' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Clarity:</strong> {Math.round(speechAnalysis.clarity)}%
              <div style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                marginTop: '5px'
              }}>
                <div style={{
                  width: `${speechAnalysis.clarity}%`,
                  height: '100%',
                  backgroundColor: speechAnalysis.clarity > 80 ? '#4CAF50' : speechAnalysis.clarity > 60 ? '#FF9800' : '#f44336',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Confidence:</strong> {Math.round(speechAnalysis.confidence)}%
              <div style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                marginTop: '5px'
              }}>
                <div style={{
                  width: `${speechAnalysis.confidence}%`,
                  height: '100%',
                  backgroundColor: speechAnalysis.confidence > 80 ? '#4CAF50' : speechAnalysis.confidence > 60 ? '#FF9800' : '#f44336',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '15px', 
            borderRadius: '10px',
            marginTop: '15px'
          }}>
            <strong>💬 Feedback:</strong> {speechAnalysis.feedback}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button 
          className="btn btn-success mt-15"
          onClick={handleSubmitPractice}
        >
          Submit Practice
        </button>
        
        <button 
          className="btn btn-teal mt-10"
          onClick={() => navigate('/emotion-check')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpeechPractice;