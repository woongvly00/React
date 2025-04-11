import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import caxios from '../../Utils/caxios';
import { sliceEvents } from '@fullcalendar/core';
import rStyle from './MettingRoom.module.css';
import InputResev from './InputResv'



const MeetingRoom = ()=> {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);

    const handleDateSelect = (selectInfo) => {
        setSelectedInfo(selectInfo);
        setIsModalOpen(true);
      };

      const events = [
        {
            id: '1',
            title: '회의: 프로젝트 킥오프',
            start: '2025-04-04T10:00:00',
            end: '2025-04-04T11:30:00',
          }
      ]

    return (
        <div>
        <div className={rStyle.reservTable}>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            allDaySlot={false} 
            initialView='timeGridWeek'
            slotMinTime="08:00:00"
            slotMaxTime="24:00:00"
            slotDuration="00:30:00"
            headerToolbar={{
                left: '',
                center: 'prev today next',
                right: 'dayGridMonth,timeGridWeek'
            }}
            
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            events={events}
            />
        </div>
        
        {isModalOpen && (<InputResev closeModal={() => setIsModalOpen(false)} selectedInfo={selectedInfo}/>)}
        
        </div>
    )
};


export default MeetingRoom;