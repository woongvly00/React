import React from 'react';
import style from './ReserveMain.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const ReserveMain = () => {


  return (

    <div className={style.reservContainer}>
      <div>
        사이드컬럼
      </div>
      <div className={style.subcontainer}>



        <h2>📄 예약</h2>
        <div className="approval-grid"></div>
    




      </div>
    </div>
  );
};

export default ReserveMain;