import React, {useState,useEffect} from 'react';
import './Navigation.css';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import MessengerPopupContainer from "../Messages/MessengerPopupContainer";


const Navigation = () => {
  
  const navigate = useNavigate();

  const toApproval = () => {navigate('/mainpage/maincontent/approval', { state: { name: 'approval' } })};
  const toSchedule = () => {navigate('/mainpage/maincontent/schedule', { state: { name: 'schedule' } })};
  const toBoard = () => {navigate('/mainpage/maincontent/board', { state: { name: 'board' } })};
  const toHR = () => {navigate('/mainpage/maincontent/hr', { state: { name: 'hr' } })};
  const toReserve = () => {navigate('/mainpage/maincontent/reserve', { state: { name: 'reserve' } })};

  const [chatWindow, setChatWindow] = useState(null);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    // 현재 창이 팝업인지 체크
    setIsPopup(window.opener != null);
  }, []);

  const openMessenger = () => {
    if (chatWindow && !chatWindow.closed) {
        chatWindow.focus();
        return;
    }

    const url = `${window.location.origin}/messenger`;
    const newWindow = window.open(url, "MessengerPopup", "width=420,height=620");
    setChatWindow(newWindow);

  };

  if (isPopup) {
    return  <MessengerPopupContainer />;
  
  }
 
  return (
    <nav className="navigation">
        <button className="nav-btn" onClick={ toApproval }>전자결제</button>
        <button className="nav-btn" onClick={ toBoard }>게시판</button>
        <button className="nav-btn" onClick={ toHR }>인사관리</button>
        <button className="nav-btn" onClick={openMessenger}>메신저</button>
        <button className="nav-btn" onClick={ toReserve }>예약</button>
        <button className="nav-btn" onClick={ toSchedule }>일정</button>
    </nav>
  );
};

export default Navigation;
