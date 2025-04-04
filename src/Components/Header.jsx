import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle user menu dropdown
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="header">
      <div className="logo">🌐 GroupWare</div>
      <div className="header-buttons">
        <button>🔍</button>
        <button>💬</button>
        <button>⚙️</button>
        <div className="user-menu-container" ref={userMenuRef}>
          <button className="user-icon-button" onClick={toggleUserMenu}>
            <i className="fa-solid fa-circle-user"></i>
          </button>
          {showUserMenu && (
            <div className="user-dropdown">
              <ul>
                <li onClick={() => window.location.href = '/mypage'}>
                  <i className="fa-solid fa-user"></i> 마이페이지
                </li>
                <li onClick={() => window.location.href = '/test'}>
                  <i className="fa-solid fa-vial"></i> 테스트 페이지
                </li>
                <li>
                  <i className="fa-solid fa-gear"></i> 설정
                </li>
                <li>
                  <i className="fa-solid fa-right-from-bracket"></i> 로그아웃
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;