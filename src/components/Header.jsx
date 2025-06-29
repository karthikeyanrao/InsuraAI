import React from 'react';
import { FiShield } from 'react-icons/fi';

const Header = () => (
  <header className="header" style={{ background: '#0f172a', padding: '1.5rem 0', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
    <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <FiShield size={36} color="#4fc3f7" style={{ marginRight: 12 }} />
      <div>
        <h1 style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>InsuraAI</h1>
        <p style={{ margin: 0, color: '#b6c2d1', fontSize: 15, fontWeight: 400 }}>Next-Generation AI-Powered Insurance Claims Platform</p>
      </div>
    </div>
  </header>
);

export default Header; 