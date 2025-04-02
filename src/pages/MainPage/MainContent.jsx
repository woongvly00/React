import React from 'react';
import useMenuStore from '../../store/useMenuStore.js';
import ApprovalMain from '../Approval/ApprovalMain';
import ScheduleMain from '../Schedule/ScheduleMain';
import style from './MainContent.module.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';

const MainContent = () => {
  
  

  return (

    <div className={style.container}>
      <div className={style.sidebar}>
        <Link to="/mainpage/maincontent/approval"><i className="fa-solid fa-house"></i></Link>
        <Link to="/mainpage/maincontent/approval"></Link><i className="fa-solid fa-calendar"></i>
        <Link to="/mainpage/maincontent/approval"></Link><i className="fa-solid fa-inbox"></i>
        <Link to="/mainpage/maincontent/approval"></Link>
        <Link to="/mainpage/maincontent/approval"></Link>
        <Link to="/mainpage/maincontent/approval"></Link>

      </div>
      <div>
        <Routes>
          <Route path="approval" element={<ApprovalMain/>}></Route>
          <Route path="schedule" element={<ScheduleMain/>}></Route>
          <Route path="board" element={<ApprovalMain/>}></Route>
          <Route path="hr" element={<ApprovalMain/>}></Route>
          <Route path="reserve" element={<ApprovalMain/>}></Route>
          <Route path="msg" element={<ApprovalMain/>}></Route>
        </Routes>
      </div>
  

    </div>
    
  );
};



export default MainContent;
