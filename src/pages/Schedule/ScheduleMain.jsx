import React from 'react';
import style from './ScheduleMain.module.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const events = [
  { title: 'Meeting', start: new Date() }
]

export default function ScheduleMain() {
  return (
    <div className={style.ScheContainer}>
      <div className={style.sideList}>
        사이드컬럼
      </div>
      <div className={style.calender}>
      <h2>일정</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}



// const ScheduleMain = () => {


//   return (

//     <div className={style.ScheContainer}>
//       <div>
//         사이드컬럼
//       </div>
//       <div className={style.container}>



//         <h2>일정</h2>
//         <div className="approval-grid"></div>





//       </div>
//     </div>
//   );
// };

// export default ScheduleMain;