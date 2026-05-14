import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Product() {
  const { user, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [carTier, setCarTier] = useState('standard'); // standard | luxury
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = () => {
    if (!user) {
      alert("Please sign in to place an order.");
      loginWithGoogle();
      return;
    }
    
    setIsOrdering(true);
    
    // Simulate API call to save order
    setTimeout(() => {
      const newOrder = {
        id: 'ORD-' + Math.floor(Math.random() * 100000),
        date: new Date().toLocaleDateString(),
        tier: carTier,
        price: carTier === 'luxury' ? 1119 : 599,
        status: 'Processing'
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('suncrafts_orders') || '[]');
      localStorage.setItem('suncrafts_orders', JSON.stringify([newOrder, ...existingOrders]));
      
      setIsOrdering(false);
      navigate('/orders');
    }, 1000);
  };

  return (
    <div className="container">
      <div className="product-grid">
        <div className="product-image">
          {/* Placeholder for real product image */}
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#888' }}>
            Product Image
          </div>
        </div>
        
        <div className="product-info">
          <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Signature Collection
          </span>
          <h1>The Foldable Inner Cover</h1>
          <div className="price">
            ₹{carTier === 'luxury' ? '1,119' : '599'}
          </div>
          
          <p style={{ marginBottom: '2rem', color: 'var(--muted)', fontSize: '1.1rem' }}>
            Durable multi-layer thermal block. Folds flat. 10-sec effortless setup. 
            Keep your dashboard crack-free and your seats cool.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', fontFamily: 'Lora, serif' }}>Select Your Vehicle Class</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setCarTier('standard')}
                style={{ 
                  flex: 1, 
                  padding: '1rem', 
                  background: carTier === 'standard' ? 'var(--primary)' : 'white',
                  color: carTier === 'standard' ? 'white' : 'var(--primary)',
                  border: '1px solid var(--primary)',
                  borderRadius: '4px'
                }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Standard Fit</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Hatchback, Sedan, SUV</div>
              </button>
              
              <button 
                onClick={() => setCarTier('luxury')}
                style={{ 
                  flex: 1, 
                  padding: '1rem', 
                  background: carTier === 'luxury' ? 'var(--gold)' : 'white',
                  color: carTier === 'luxury' ? 'white' : 'var(--gold)',
                  border: `1px solid var(--gold)`,
                  borderRadius: '4px'
                }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Luxury Fit</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Includes Leather Pouch & Microfiber</div>
              </button>
            </div>
          </div>

          <button onClick={handleOrder} disabled={isOrdering} className="buy-btn">
            {isOrdering ? 'Processing...' : (user ? 'Checkout Now' : 'Sign in to Buy')}
          </button>
          
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center' }}>
            Free Express Delivery in Vadodara.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
