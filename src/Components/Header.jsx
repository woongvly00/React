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
        <button><i className="fa-solid fa-circle-user"></i></button>
      </div>
    </header>
    
  );
};

export default Header;
