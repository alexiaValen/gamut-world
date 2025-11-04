import React, { useState } from 'react';

const AIChat = ({ chatId, prompt, style = {} }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m here to help you learn and practice. How are you feeling today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessages = [...messages, { type: 'user', text: inputText }];
      
      // Simulate AI response based on the prompt context
      setTimeout(() => {
        let botResponse = '';
        if (prompt.includes('storyGuide')) {
          botResponse = getStoryGuideResponse(inputText);
        } else if (prompt.includes('speechCoach')) {
          botResponse = getSpeechCoachResponse(inputText);
        } else {
          botResponse = 'That\'s wonderful! Keep practicing and you\'ll do great! 🌟';
        }
        
        setMessages([...newMessages, { type: 'bot', text: botResponse }]);
      }, 1000);
      
      setMessages(newMessages);
      setInputText('');
    }
  };

  const getStoryGuideResponse = (userInput) => {
    const responses = [
      "That's totally okay! Everyone learns at their own speed. Let's try together slowly.",
      "It's okay to be shy! Let's take a deep breath and try again when you're ready.",
      "You're doing great! Remember, practice makes progress, not perfection.",
      "I understand how you feel. Let's break this down into smaller steps.",
      "That's a wonderful question! Let me help you understand this better."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getSpeechCoachResponse = (userInput) => {
    const responses = [
      "Pausing is part of learning. Celebrate effort over perfection. Gentle repetition builds confidence.",
      "Encourage them to slow down and use visual cues. Avoid correcting too much—focus on connection.",
      "Great progress! Remember that every child learns at their own pace.",
      "Try using visual cues and positive reinforcement to build confidence.",
      "Focus on celebrating small wins and creating a supportive environment."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="ai-chat" style={style}>
      <div className="ai-chat-header">
        🤖 AI Helper
      </div>
      <div className="ai-chat-content">
        {messages.map((message, index) => (
          <div key={index} style={{
            marginBottom: '10px',
            padding: '8px 12px',
            borderRadius: '10px',
            backgroundColor: message.type === 'user' ? '#e3f2fd' : '#f5f5f5',
            alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}>
            <strong>{message.type === 'user' ? 'You: ' : 'AI: '}</strong>
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '20px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '8px 16px',
            backgroundColor: '#69C9D0',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;