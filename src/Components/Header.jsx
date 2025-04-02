import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">🌐 GroupWare</div>
      <div className="header-buttons">
        <button>🔍</button>
        <button>💬</button>
        <button>⚙️</button>
        <button className="login-button">로그인</button>
      </div>
    </header>
    
  );
};

export default Header;
