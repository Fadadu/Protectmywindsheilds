import React from 'react';

function Help() {
  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>How can we help you?</h1>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Contact Suncrafts Support</h3>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
          Our team in Vadodara is ready to assist you with sizing, orders, or returns. 
          We pride ourselves on lightning-fast, local customer service.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <a href="https://wa.me/918511245666" target="_blank" rel="noreferrer" 
            style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block' }}>Chat on WhatsApp</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Fastest response time</span>
            </div>
            <span style={{ color: 'var(--accent)' }}>&rarr;</span>
          </a>
          
          <a href="mailto:yashraulji18@gmail.com" 
            style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block' }}>Email Support</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>yashraulji18@gmail.com</span>
            </div>
            <span style={{ color: 'var(--accent)' }}>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Help;
