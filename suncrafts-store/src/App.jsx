import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Help from './pages/Help';
import './index.css';

// Mock Auth Context for local testing before real Firebase is hooked up
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('suncrafts_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const loginWithGoogle = () => {
    // Simulated Google Auth
    const mockUser = {
      uid: 'google-auth-123',
      name: 'Test User',
      email: 'user@example.com',
      initials: 'TU'
    };
    setUser(mockUser);
    localStorage.setItem('suncrafts_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('suncrafts_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      <BrowserRouter>
        <nav>
          <Link to="/" className="nav-brand">Suncrafts.</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/product">Shop Covers</Link>
            <Link to="/help">Help</Link>
            {user ? (
              <div className="user-menu">
                <Link to="/orders">My Orders</Link>
                <div className="user-avatar">{user.initials}</div>
                <button onClick={logout} className="auth-btn" style={{background: 'transparent', color: '#666', border: '1px solid #ccc'}}>Logout</button>
              </div>
            ) : (
              <button onClick={loginWithGoogle} className="auth-btn">Sign in with Google</button>
            )}
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
