import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import useAuthStore from '../store/useAuthStore';
import { Link, Route, useNavigate } from 'react-router-dom';
import useScheduleStore from '../store/useScheduleStore';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const {userId} = useAuthStore.getState();
  const { setEvents } = useScheduleStore();

  const logout = useAuthStore((state) => state.logout);
  const navi = useNavigate();

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
               <Link to= "/mainpage/maincontent/mypage"> <li><i className="fa-solid fa-user"></i> 마이페이지</li></Link>
               <Link to="/home/header/test"> <li><i className="fa-solid fa-vial"></i> 테스트 페이지</li></Link>
               <Link to="/home/header/setting"> <li><i className="fa-solid fa-gear"></i> 설정</li></Link> 
                <li onClick={() => { logout(); navi("/"); setEvents([]);}}>
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