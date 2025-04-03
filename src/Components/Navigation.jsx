import React from 'react';
import './Navigation.css';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';



const Navigation = () => {
  
  const navigate = useNavigate();

  const toApproval = () => {navigate('/mainpage/maincontent/approval')};
  const toSchedule = () => {navigate('/mainpage/maincontent/schedule')};
  const toBoard = () => {navigate('/mainpage/maincontent/board')};
  const toHR = () => {navigate('/mainpage/maincontent/hr')};
  const toMSG = () => {navigate('/mainpage/maincontent/msg')};
  const toReserve = () => {navigate('/mainpage/maincontent/reserve')};


 
  return (
    <nav className="navigation">
        <button className="nav-btn" onClick={ toApproval }>전자결제</button>
        <button className="nav-btn" onClick={ toBoard }>게시판</button>
        <button className="nav-btn" onClick={ toHR }>인사관리</button>
        <button className="nav-btn" onClick={ toMSG }>메신저</button>
        <button className="nav-btn" onClick={ toReserve }>예약</button>
        <button className="nav-btn" onClick={ toSchedule }>일정</button>
    </nav>
  );
};

export default Navigation;
