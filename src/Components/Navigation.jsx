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
        <div className="nav-item" onClick={toApproval}>
        <i className="fa-solid fa-4x fa-inbox"  style={{ color: "#1a3c6c" }}/>   
          <span>전자결재</span>
        </div>
        <div className="nav-item" onClick={toBoard}>
        <i className="fa-solid fa-4x fa-clipboard" style={{ color: "#1a3c6c" }} />
          <span>게시판</span>
        </div>
        <div className="nav-item" onClick={toHR}>
          <i className="fa-solid fa-4x fa-user"  style={{ color: "#1a3c6c" }}/>  
          <span>인사관리</span>
        </div>
        <div className="nav-item" onClick={openMessenger}>
          <i className="fa-solid fa-4x fa-comments"></i>
          <span translate='no'>메신저</span>
        </div>
        <div className="nav-item" onClick={toReserve}>
        <i className="fa-solid fa-4x fa-clock"  style={{ color: "#1a3c6c" }}/>
          <span>예약</span>
        </div>
        <div className="nav-item" onClick={toSchedule}>
          <i className="fa-solid fa-4x fa-calendar" style={{ color: "#1a3c6c" }}/> 
          <span>일정</span>
        </div>
      </nav>
  );
};

export default Navigation;
