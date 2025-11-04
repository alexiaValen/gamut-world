import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Mock data for charts
  const clarityData = {
    week: [65, 70, 75, 78, 82, 85, 88],
    month: [60, 65, 70, 72, 75, 78, 80, 82, 84, 85, 87, 88]
  };

  const confidenceData = {
    week: [70, 72, 75, 78, 80, 83, 85],
    month: [65, 68, 70, 72, 74, 76, 78, 80, 81, 83, 84, 85]
  };

  const emotionData = {
    week: { Happy: 5, Excited: 3, Proud: 4, Nervous: 2, Calm: 3 },
    month: { Happy: 18, Excited: 12, Proud: 15, Nervous: 8, Calm: 11, Curious: 6 }
  };

  const SimpleLineChart = ({ data, title, color = '#69C9D0' }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    return (
      <div style={{ margin: '20px 0' }}>
        <h4 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>{title}</h4>
        <div style={{
          height: '200px',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          position: 'relative',
          border: '1px solid #e0e0e0'
        }}>
          <svg width="100%" height="160" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line
                key={y}
                x1="0"
                y1={160 - (y * 1.6)}
                x2="100%"
                y2={160 - (y * 1.6)}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
            ))}
            
            {/* Data line */}
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="3"
              points={data.map((value, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 160 - ((value - minValue) / range) * 140 - 10;
                return `${x}%,${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {data.map((value, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 160 - ((value - minValue) / range) * 140 - 10;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={y}
                  r="4"
                  fill={color}
                />
              );
            })}
          </svg>
          
          {/* Y-axis labels */}
          <div style={{ position: 'absolute', left: '-10px', top: '10px', fontSize: '12px', color: '#666' }}>
            {maxValue}%
          </div>
          <div style={{ position: 'absolute', left: '-10px', bottom: '10px', fontSize: '12px', color: '#666' }}>
            {minValue}%
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Latest: <strong style={{ color: color }}>{data[data.length - 1]}%</strong>
        </div>
      </div>
    );
  };

  const SimpleBarChart = ({ data, title }) => {
    const maxValue = Math.max(...Object.values(data));
    
    return (
      <div style={{ margin: '20px 0' }}>
        <h4 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>{title}</h4>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #e0e0e0'
        }}>
          {Object.entries(data).map(([emotion, count]) => (
            <div key={emotion} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>{emotion}</span>
                <span style={{ fontWeight: 'bold' }}>{count}</span>
              </div>
              <div style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(count / maxValue) * 100}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-color)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease-in-out'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page scroll">
      <div className="title">👩‍👧 Parent Dashboard</div>
      <div className="subtitle">Track your child's speech progress and confidence over time.</div>

      {/* Timeframe Selector */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <button
          className={`btn ${selectedTimeframe === 'week' ? 'btn-info' : 'btn-secondary'}`}
          onClick={() => setSelectedTimeframe('week')}
          style={{ margin: '0 10px' }}
        >
          This Week
        </button>
        <button
          className={`btn ${selectedTimeframe === 'month' ? 'btn-info' : 'btn-secondary'}`}
          onClick={() => setSelectedTimeframe('month')}
          style={{ margin: '0 10px' }}
        >
          This Month
        </button>
      </div>

      {/* Progress Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '20px 0' }}>
        <div className="progress-container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🗣️</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {clarityData[selectedTimeframe][clarityData[selectedTimeframe].length - 1]}%
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Speech Clarity</div>
        </div>
        
        <div className="progress-container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>💪</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
            {confidenceData[selectedTimeframe][confidenceData[selectedTimeframe].length - 1]}%
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Confidence Level</div>
        </div>
        
        <div className="progress-container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent-color)' }}>
            {selectedTimeframe === 'week' ? '7' : '28'}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Practice Sessions</div>
        </div>
      </div>

      {/* Charts */}
      <div className="progress-container" style={{ width: '100%' }}>
        <SimpleLineChart 
          data={clarityData[selectedTimeframe]} 
          title="Speech Clarity Progress" 
          color="var(--primary-color)"
        />
        
        <SimpleLineChart 
          data={confidenceData[selectedTimeframe]} 
          title="Response Confidence" 
          color="var(--secondary-color)"
        />
        
        <SimpleBarChart 
          data={emotionData[selectedTimeframe]} 
          title="Emotion Recognition Trends" 
        />
      </div>

      {/* AI Speech Coach Tips */}
      <div className="progress-container" style={{ width: '100%' }}>
        <div className="subsection-title">Tips from AI Speech Coach:</div>
        <AIChat 
          chatId="speechCoach"
          prompt="Give gentle suggestions to parents to help kids with speech delays continue improving in a positive way."
          style={{ width: '100%', height: 300 }}
        />
      </div>

      {/* Recommendations */}
      <div className="progress-container" style={{ width: '100%' }}>
        <div className="subsection-title">📋 Personalized Recommendations</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ margin: '15px 0', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '10px', borderLeft: '4px solid #4CAF50' }}>
            <strong>✅ Great Progress!</strong> Your child's speech clarity has improved by 23% this month. Keep up the consistent practice!
          </div>
          <div style={{ margin: '15px 0', padding: '15px', backgroundColor: '#fff3e0', borderRadius: '10px', borderLeft: '4px solid #FF9800' }}>
            <strong>💡 Suggestion:</strong> Try incorporating more emotion recognition activities. This can boost confidence in social situations.
          </div>
          <div style={{ margin: '15px 0', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '10px', borderLeft: '4px solid #2196F3' }}>
            <strong>🎯 Next Goal:</strong> Work on conversation starters. Your child is ready for more interactive dialogue practice.
          </div>
        </div>
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

export default ParentDashboard;