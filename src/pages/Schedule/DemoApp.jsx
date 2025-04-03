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
  


  // 이벤트 삭제 기능
  function handleEventClick(clickInfo) {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
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
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="일정 제목 입력"
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
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
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