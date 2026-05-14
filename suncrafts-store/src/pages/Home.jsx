import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Effortless Sun Protection for the Modern Driver.</h1>
        <p>10 seconds to a cooler car. Zero friction. Designed specifically for Indian summers and crafted with premium materials.</p>
        <div style={{ marginTop: '3rem' }}>
          <Link to="/product" className="auth-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Shop The Collection
          </Link>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '4rem', textAlign: 'center' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Instant Setup</h3>
          <p style={{ color: 'var(--muted)' }}>Pops open in seconds, folds away just as fast.</p>
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Guaranteed Fit</h3>
          <p style={{ color: 'var(--muted)' }}>Curated sizes for Indian Hatchbacks, Sedans, and SUVs.</p>
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Premium Quality</h3>
          <p style={{ color: 'var(--muted)' }}>Multi-layer thermal blocking that doesn't flake or peel.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
