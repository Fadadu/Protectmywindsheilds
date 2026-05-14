import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    const savedOrders = JSON.parse(localStorage.getItem('suncrafts_orders') || '[]');
    setOrders(savedOrders);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Order History</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>You haven't placed any orders yet.</p>
          <button onClick={() => navigate('/product')} className="auth-btn">Shop Now</button>
        </div>
      ) : (
        <div>
          {orders.map((order, i) => (
            <div key={i} className="order-card">
              <div className="order-header">
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Order Placed</div>
                  <div style={{ fontWeight: 600 }}>{order.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Total</div>
                  <div style={{ fontWeight: 600 }}>₹{order.price}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Order #</div>
                  <div style={{ fontWeight: 600 }}>{order.id}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontFamily: 'Lora, serif' }}>The Foldable Inner Cover</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                    {order.tier === 'luxury' ? 'Luxury Fit (+ Leather Pouch & Microfiber)' : 'Standard Fit'}
                  </p>
                </div>
                <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500 }}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
