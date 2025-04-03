import React from 'react';
import ApprovalMain from '../Approval/ApprovalMain';
import ScheduleMain from '../Schedule/ScheduleMain';
import Boardlist from '../Boardlist/Board_standard';
import ReserveMain from '../Reserve/ReserveMain';
import style from './MainContent.module.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';

const MainContent = () => {
  
  

  return (

    <div className={style.maincontainer}>
      <div className={style.mainSidebar}>
        <Link to="/mainpage"><i className="fa-solid fa-2x fa-house" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/approval"><i className="fa-solid fa-2x fa-inbox"  style={{ color: '#FFFFFF', margin: '20px 0'  }}></i></Link>
        <Link to="/mainpage/maincontent/board"><i className="fa-solid fa-2x fa-clipboard" style={{ color: '#FFFFFF', margin: '20px 0'  }}></i></Link>
        <Link to="/mainpage/maincontent/schedule"><i className="fa-solid fa-2x fa-calendar" style={{ color: '#FFFFFF', margin: '20px 0'  }}></i></Link>
        <Link to="/mainpage/maincontent/reserve"><i className="fa-solid fa-2x fa-clock" style={{ color: '#FFFFFF', margin: '20px 0'  }}></i></Link>
        <Link to="/mainpage/maincontent/msg"><i className="fa-solid fa-2x fa-comment" style={{ color: '#FFFFFF', margin: '20px 0'  }}></i></Link>
      </div>
      <div>
        <Routes>
          <Route path="approval" element={<ApprovalMain/>}></Route>
          <Route path="schedule" element={<ScheduleMain/>}></Route>
          <Route path="board" element={<Boardlist/>}></Route>
          <Route path="hr" element={<ApprovalMain/>}></Route>
          <Route path="reserve" element={<ReserveMain/>}></Route>
          <Route path="msg" element={<ApprovalMain/>}></Route>
        </Routes>
      </div>
  

    </div>
    
  );
};



export default MainContent;
