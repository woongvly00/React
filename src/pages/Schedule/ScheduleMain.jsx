import React from 'react';
import style from './ScheduleMain.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const ScheduleMain = () => {


  return (

    <div className="approval-container">
      <div>
        사이드컬럼
      </div>
      <div className={style.container}>



        <h2>📄 일정</h2>
        <div className="approval-grid"></div>
    




      </div>
    </div>
  );
};

export default ScheduleMain;