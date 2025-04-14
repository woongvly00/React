import React, { useState } from 'react';
import style from './ScheduleMain.module.css';
import DemoApp from './DemoApp';



const ScheduleMain = () => {
  const [reloadKey, setReloadKey] = useState(0);
  
  return (
    <div className={style.ScheContainer}>
      <div className={style.calender}>
      <h2>일정</h2>
        <DemoApp key={reloadKey} onRefresh={() => setReloadKey(prev => prev + 1)}  reloadKey={reloadKey} />
    </div>
    </div>
  )
}



export default ScheduleMain;


  