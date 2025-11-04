import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RewardStore = () => {
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(85);
  const [inventory, setInventory] = useState(['Story Explorer Badge']);
  const [showPurchaseMessage, setShowPurchaseMessage] = useState('');

  const storeItems = [
    { name: "Cool Hat", cost: 30, emoji: "🎩", image: "hat.png", description: "A stylish hat for your avatar!" },
    { name: "Friendly Pet", cost: 50, emoji: "🐕", image: "pet.png", description: "A loyal companion for your adventures!" },
    { name: "Room Theme: Ocean", cost: 40, emoji: "🌊", image: "ocean_theme.png", description: "Transform your room into an underwater paradise!" },
    { name: "Sticker Pack", cost: 20, emoji: "⭐", image: "stickers.png", description: "Fun stickers to decorate your profile!" },
    { name: "Magic Wand", cost: 60, emoji: "🪄", image: "wand.png", description: "Cast spells of confidence and courage!" },
    { name: "Rainbow Badge", cost: 25, emoji: "🌈", image: "rainbow.png", description: "Show off your colorful personality!" }
  ];

  const handlePurchase = (item) => {
    if (userPoints >= item.cost) {
      setUserPoints(prev => prev - item.cost);
      setInventory(prev => [...prev, item.name]);
      setShowPurchaseMessage(`You bought ${item.name}! 🎉`);
      
      setTimeout(() => {
        setShowPurchaseMessage('');
      }, 3000);
    } else {
      setShowPurchaseMessage("Not enough points yet! Keep practicing 😊");
      
      setTimeout(() => {
        setShowPurchaseMessage('');
      }, 3000);
    }
  };

  const canAfford = (cost) => userPoints >= cost;
  const isOwned = (itemName) => inventory.includes(itemName);

  return (
    <div className="page scroll">
      <div className="title">🎨 Reward Store</div>
      <div className="subtitle">Use your earned points to unlock fun items!</div>

      {/* Points Display */}
      <div className="progress-container" style={{ width: '90%', textAlign: 'center', margin: '20px auto' }}>
        <div className="info-text">Your Points: <strong style={{ color: 'var(--primary-color)', fontSize: '24px' }}>{userPoints} ⭐</strong></div>
      </div>

      {/* Purchase Message */}
      {showPurchaseMessage && (
        <div style={{
          margin: '20px auto',
          padding: '15px',
          backgroundColor: showPurchaseMessage.includes('Not enough') ? '#ffebee' : '#e8f5e8',
          color: showPurchaseMessage.includes('Not enough') ? '#c62828' : '#2e7d32',
          borderRadius: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          maxWidth: '400px'
        }}>
          {showPurchaseMessage}
        </div>
      )}

      {/* Store Items */}
      <div className="store-grid">
        {storeItems.map((item, index) => (
          <div key={index} className="store-item">
            <div className="emoji">{item.emoji}</div>
            <h3 style={{ margin: '10px 0', color: 'var(--text-dark)' }}>{item.name}</h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>{item.description}</p>
            <div className="cost" style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>
              {item.cost} ⭐
            </div>
            
            {isOwned(item.name) ? (
              <div style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                ✅ Owned
              </div>
            ) : (
              <button
                className={`btn ${canAfford(item.cost) ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => handlePurchase(item)}
                disabled={!canAfford(item.cost)}
                style={{
                  opacity: canAfford(item.cost) ? 1 : 0.6,
                  cursor: canAfford(item.cost) ? 'pointer' : 'not-allowed'
                }}
              >
                {canAfford(item.cost) ? 'Buy Now' : 'Need More Points'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Inventory Section */}
      <div className="progress-container" style={{ width: '90%', margin: '30px auto' }}>
        <div className="subsection-title">🎒 My Inventory</div>
        {inventory.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {inventory.map((item, index) => (
              <div key={index} style={{
                padding: '10px 15px',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            Your inventory is empty. Start earning points to buy items!
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="progress-container" style={{ width: '90%', margin: '20px auto' }}>
        <div className="subsection-title">💡 How to Earn More Points</div>
        <ul style={{ textAlign: 'left', color: '#666' }}>
          <li>Complete speech practice exercises (+10 points)</li>
          <li>Identify emotions correctly (+10 points)</li>
          <li>Watch educational stories (+5 points)</li>
          <li>Practice conversations with AI (+15 points)</li>
          <li>Complete daily challenges (+20 points)</li>
        </ul>
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

export default RewardStore;