import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import caxios from '../../Utils/caxios';
import { sliceEvents } from '@fullcalendar/core';
import rStyle from './MettingRoom.module.css';



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
        <div class={rStyle.reservTable}>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='timeGridDay'
            headerToolbar={{
                left: 'dayGridMonth,timeGridWeek,timeGridDay',
                center: 'prev today next',
                right: ''
            }}
            
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            events={events}
            />
        </div>
    )
};


export default MeetingRoom;