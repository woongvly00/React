import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import calenderStyle from './DemoApp.module.css';
import caxios from '../../Utils/caxios';






export default function DemoApp() {


  function handleDateSelect(selectInfo) {
    setSelectedInfo(selectInfo)
    setIsModalOpen(true)
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const [schedule_id, setSchedule_id] = useState('');
  const [s_category_id, setS_category_id] = useState('');
  const [schedule_title, setSchedule_title] = useState('');
  const [schedule_content, setSchedule_content] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [event, setEvent] = useState({setSchedule_id: 0 ,
                                      setS_category_id: 0,
                                      setSchedule_title: '',
                                      setStart_date: '',
                                      setEnd_date: '',
                                      startTime: '',
                                      endTime: ''
  });

  const handleInput = (e) => {
          const { name, value } = e.target;
          setEvent((prev) => ({ ...prev, [name]: value }));
      }


  function handleEventClick(clickInfo) {
      alert(`'${clickInfo.event.title}' 이벤트 클릭됨`);
    }


  function handleAddEvent() {
    const calendarApi = selectedInfo.view.calendar
    calendarApi.unselect()

    if (schedule_title) {
      const newEvent = {
        schedule_id: createEventId(),
        shedule_title: schedule_title || '',
        start_date: selectedInfo.startStr,
        end_date: selectedInfo.endStr,
        allDay: selectedInfo.allDay
      };

      calendarApi.addEvent(newEvent);

      

      caxios.post(`/schedule`, event).then(resp => {
      }).catch((error)=>{
          if(error.response.status == 404){
              alert("등록에 실패했습니다.");
          }
        })

        setCurrentEvents((prev) => [...prev, newEvent]);

    }
  
    // 초기화
    setSchedule_title('')
    setIsModalOpen(false)
  }
  




    // 삭제 버튼 클릭시 삭제
    function CancleBtnClick(deleteEvent) {
      if (window.confirm(`Are you sure you want to delete the event '${deleteEvent.event.title}'`)) {
        deleteEvent.event.remove()
      }
    }

    // 주말 보이기 여부 / 캘린더에 표시 중인 이벤트 목록
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])

    // 주말표시 on/off
    function handleWeekendsToggle() {
      setWeekendsVisible(!weekendsVisible)
    }

    // 이벤트 변경 사항 업데이트
    function handleEvents(events) {
      setCurrentEvents(events)
    }

  return (
    <div className='demo-app'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      />
      <div className='demo-app-main'>
        <FullCalendar
          
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          // dateClick={this.dateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          events={currentEvents}
        />
      </div>

      {isModalOpen && (
        <div className={calenderStyle['modal-overlay']}>
          <div className={calenderStyle['modal-container']}>
            <h2>일정 추가</h2>
            <div>
              캘린더
              <select>
                <option name="s_category_id" value="111" onChange={handleInput}>캘린더 list 넣기</option>
              </select>
            </div>
            <div>
              일정 제목
            <input
              type="text"
              name="schedule_title"
              value={schedule_title}
              onChange={handleInput}
              // onChange={(e) => setSchedule_title(e.target.value)}
              placeholder="일정 제목 입력"
              autoFocus
            />
            </div>
            <div>
              시작
              <input name="start_date" type="date"  onChange={handleInput}></input>
              <select>
                <option name="startTime" value="2025-04-03T09:00">오전 09:00</option>
              </select>
            </div>
            <div>
              종료
              <input name="end_date" type="date" onChange={handleInput}></input>
              <select>
                <option name="endTime" value="2025-04-03T10:00">오전 10:00</option>
              </select>
            </div>
            <div>
              일정 내용
              <textarea
                name="schedule_content"
                value={newContent}
                onChange={handleInput}
                placeholder="내용 입력"
                style={{ width: '300px;', height: '150px', resize: 'none' }}
              />
            </div>
            <div className={calenderStyle['modal-buttons']}>
              <button onClick={handleAddEvent}>저장</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

    </div>

    
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>

    
  )
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
