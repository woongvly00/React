import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import calenderStyle from './DemoApp.module.css';

export default function DemoApp() {

  // 주말 보이기 여부 / 캘린더에 표시 중인 이벤트 목록
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  // 주말표시 on/off
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }


  // 캘린더의 날짜 드래그/클릭 하면 새로운 일정 추가
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  function handleDateSelect(selectInfo) {

    setSelectedInfo(selectInfo)
    setIsModalOpen(true)
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  function handleAddEvent() {
    const calendarApi = selectedInfo.view.calendar
    calendarApi.unselect()
  
    if (newTitle) {
      calendarApi.addEvent({
        id: createEventId(),
        title: newTitle,
        start: selectedInfo.startStr,
        end: selectedInfo.endStr,
        allDay: selectedInfo.allDay
      })
    }
  
    // 초기화
    setNewTitle('')
    setIsModalOpen(false)
  }
  


  // 이벤트 클릭시
  function handleEventClick(clickInfo) {
    const event = clickInfo.event;
    const mouseX = clickInfo.jsEvent.clientX; 
    const mouseY = clickInfo.jsEvent.clientY - 90; 
    this.setState({ selectedEvent: event, mouseX, mouseY });

  //   showEventDetails = () => {
  //       const { selectedEvent, mouseX, mouseY } = this.state;
  //       if (selectedEvent && mouseX !== undefined && mouseY !== undefined) {
  //           console.log("Start Date:", selectedEvent.start);
  //           console.log("End Date:", selectedEvent.end);
            
  //           const startDate = selectedEvent.start && format(selectedEvent.start, 'HH:mm', { timeZone: 'Asia/Seoul' });
  //           const endDate = selectedEvent.end && format(selectedEvent.end, 'HH:mm', { timeZone: 'Asia/Seoul' });
            
  //           return (
  //               <div className="event-details" style={{ position: 'absolute', left: mouseX, top: mouseY }}>
  //                   <h2>{selectedEvent.title}</h2>
  //                   <div className='time_place'>
  //                   <p>장소: {selectedEvent.extendedProps && selectedEvent.extendedProps.location}</p> 
  //                   <p>시간: {startDate} ~ {endDate}</p>
  //                   </div>
  //                   <button onClick={() => this.setState({ selectedEvent: null, mouseX: undefined, mouseY: undefined })}>닫기</button>
  //               </div>
  //           );
  //       }
  //       return null;

  // }
}

  // 삭제 버튼 클릭시 삭제
  function CancleBtnClick(deleteEvent) {
    if (window.confirm(`Are you sure you want to delete the event '${deleteEvent.event.title}'`)) {
      deleteEvent.event.remove()
    }
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
                <option>캘린더 list 넣기</option>
              </select>
            </div>
            <div>
              일정 제목
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="일정 제목 입력"
              autoFocus
            />
            </div>
            <div>
              시작
              <input type="date"></input>
              <select>
                <option>오전 09:00</option>
              </select>
            </div>
            <div>
              종료
              <input type="date"></input>
              <select>
                <option>오전 09:00</option>
              </select>
            </div>
            <div>
              일정 내용
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
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
