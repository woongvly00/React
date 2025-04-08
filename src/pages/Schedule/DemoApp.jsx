import React, { useState, useEffect } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import calenderStyle from './DemoApp.module.css';
import caxios from '../../Utils/caxios';
import { sliceEvents } from '@fullcalendar/core';
import useScheduleStore from '../../store/useScheduleStore';

const DemoApp = () => {
  const { events, addEvent, setEvents, event, removeEvent } = useScheduleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [eventInput, setEventInput] = useState({
    id: '',
    title: '',
    start_date: '',
    end_date: '',
    startTime: '',
    endTime: '',
    content: '',
    category_id: 1,
    color: ''
  });

  useEffect(() => {
    caxios.get('/schedule').then((resp) => {
      const getAllevents = resp.data.map((event) => ({
        id:event.id,
        title: event.title,
        start: `${event.start_date}T${event.startTime}`,
        end: `${event.end_date}T${event.endTime}`,
        allDay: false,
        extendedProps: {
          category_id: event.category_id
        }
      }));
    setEvents(getAllevents);
    })
    
  }, [])

  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEventInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    const calendarApi = selectedInfo.view.calendar;
    calendarApi.unselect();

    const newEvent = {
      id: Date.now().toString(),
      title: eventInput.title,
      start: `${eventInput.start_date}T${eventInput.startTime}`,
      end: `${eventInput.end_date}T${eventInput.endTime}`,
      allDay: false,
      extendedProps: {
        content: eventInput.content,
        category_id: eventInput.category_id
      }
    };

    

    addEvent(newEvent);
    calendarApi.addEvent(newEvent);


    caxios.post("/schedule", eventInput).catch((error) => {
      if (error.response?.status === 404 || 500) {
        alert("등록에 실패했습니다.");
      }
    });

    setIsModalOpen(false);
    setEventInput({
      id: '', title: '', start_date: '', end_date: '', startTime: '', endTime: '', content: '', category_id: 1
    });
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const handleEventClick = (clickInfo) => {

    console.log(clickInfo.event.start_date, clickInfo.event.end_date);
    caxios.get(`/schedule/${clickInfo.event.id}`).then((resp) => {

      const getEvent = resp.data;
      const formattedEvent = {
        id:getEvent.id,
        title: getEvent.title,
        start_date: `${getEvent.start_date}T${getEvent.startTime}`,
        end_date: `${getEvent.end_date}T${getEvent.endTime}`,
        startTime: `${getEvent.startTime}`,
        endTime: `${getEvent.endTime}`,
        allDay: false,
        content: `${getEvent.content}`
        
      };

    setSelectedEvent(formattedEvent);
    setIsDetailOpen(true);

    });

  };



  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDelete = () => {
    removeEvent(selectedEvent.id)
    caxios.delete(`/schedule/${selectedEvent.id}`).then(resp => {})
    setIsDetailOpen(false);
  };

  const [update, setUpdate ] = useState({
    id:'',
    title:'',
    start_date:'',
    end_date: '',
    startTime: '',
    endTime: '',
    content: ''
  });

  useEffect(() => {
    if (selectedEvent) {
      setUpdate({
        id: selectedEvent.id,
        title: selectedEvent.title || '',
        start_date: selectedEvent.start_date || '',
        end_date: selectedEvent.end_date || '',
        startTime: selectedEvent.startTime || '',
        endTime: selectedEvent.endTime || '',
        content: selectedEvent.content || ''
      });
    }
  }, [selectedEvent]);

  const handleUpdate = (e) => {
    setIsEditing(true);
    const {name,value} = e.target
        setUpdate((prev)=>({...prev,[name]:value}));
  };



  const handleSave = () => {
    console.log(update);
    caxios.put(`/schedule/${update.id}`, update).then(resp => {})
    setIsEditing(false);
    setSelectedEvent(update);
  }
  
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='demo-app'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={events}
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
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventContent={renderEventContent}
          events={events}
          eventClick={handleEventClick}
        />
      </div>

      {isModalOpen && (
        <div className={calenderStyle['modal-overlay']}>
          <div className={calenderStyle['modal-container']}>
            <h2>일정 추가</h2>
            <div>
              일정 종류
              <select name="category_id" value={eventInput.category_id} onChange={handleInput}>
                <option value="111">캘린더 list 넣기</option>
              </select>
            </div>
            <div>
              일정 제목
              <input type="text" name="title" value={eventInput.title} onChange={handleInput} placeholder="일정 제목 입력" autoFocus />
            </div>
            <div>
              시작
              <input name="start_date" type="date" value={eventInput.start} onChange={handleInput} />
              <select name="startTime" value={eventInput.startTime} onChange={handleInput}>
                {Array.from({ length: 48 }).map((_, index) => {
                  const h = String(Math.floor(index / 2)).padStart(2, '0');
                  const m = index % 2 === 0 ? '00' : '30';
                  const time = `${h}:${m}`;
                  return <option key={time} value={time}>{time}</option>;
                })}
              </select>
            </div>
            <div>
              종료
              <input name="end_date" type="date" value={eventInput.end} onChange={handleInput} />
              <select name="endTime" value={eventInput.endTime} onChange={handleInput}>
                {Array.from({ length: 48 }).map((_, index) => {
                  const h = String(Math.floor(index / 2)).padStart(2, '0');
                  const m = index % 2 === 0 ? '00' : '30';
                  const time = `${h}:${m}`;
                  return <option key={time} value={time}>{time}</option>;
                })}
              </select>
            </div>
            <div>
              일정 내용
              <textarea name="content" value={eventInput.content} onChange={handleInput} placeholder="내용 입력"
                style={{ width: '300px', height: '150px', resize: 'none' }}
              />
            </div>
            <div className={calenderStyle['modal-buttons']}>
              <button onClick={handleAddEvent}>저장</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {isDetailOpen && selectedEvent && (
          <div className={calenderStyle['detail-overlay']}>
            <div className={calenderStyle['detail-container']}>
              <h2>일정 상세 정보</h2>

              {isEditing ? (<>
                <input type="hidden" name="id" value={update.id} />
                <div><strong>제목:</strong><input type="text" name="title" value={update.title} onChange={handleUpdate} placeholder="일정 제목 입력" autoFocus/></div>
                <div>
                  시작일<input name="start_date" type="date" value={update.start} onChange={handleUpdate} />
                  종료일<input name="end_date" type="date" value={update.end} onChange={handleUpdate} />
                </div>
                <div>
                  시작시간
                  <select name="startTime" value={update.startTime} onChange={handleUpdate}>
                    {Array.from({ length: 48 }).map((_, index) => {
                      const h = String(Math.floor(index / 2)).padStart(2, '0');
                      const m = index % 2 === 0 ? '00' : '30';
                      const time = `${h}:${m}`;
                      return <option key={time} value={time}>{time}</option>;
                    })}
                  </select>
                  종료시간
                  <select name="endTime" value={update.endTime} onChange={handleUpdate}>
                    {Array.from({ length: 48 }).map((_, index) => {
                      const h = String(Math.floor(index / 2)).padStart(2, '0');
                      const m = index % 2 === 0 ? '00' : '30';
                      const time = `${h}:${m}`;
                      return <option key={time} value={time}>{time}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <strong>내용:</strong>
                  <textarea name="content" value={update.content} onChange={handleUpdate} placeholder="내용 입력" style={{ width: '300px', height: '150px', resize: 'none' }}></textarea></div>
              
              </>) : (<>
                <div>{selectedEvent.id}</div>
                <div><strong>제목:</strong> {selectedEvent.title}</div>
                <div><strong>기간:</strong> {selectedEvent.start_date} ~ {selectedEvent.end_date}</div>
                <div><strong>시간:</strong> {selectedEvent.startTime} ~ {selectedEvent.endTime}</div>
                <div><strong>내용:</strong> {selectedEvent.content}</div>
              </>)}
              
        
              <div id="editBtns" className={calenderStyle['detail-buttons']}>
                {
                  isEditing ? <><button onClick={handleSave}>저장</button><button onClick={() => setIsEditing(false)}>취소</button></>
                            : <><button onClick={handleUpdate}>수정</button><button onClick={handleDelete}>삭제</button><button onClick={() => {setIsDetailOpen(false); setIsEditing(false);}}>닫기</button></>
                }
              </div>
            </div>
          </div>
        )}


    </div>
  );
}



const renderEventContent = (eventInfo) => {
  const bgColor = eventInfo.event.extendedProps.color || 'dodgeblue';
 return (
    <div style={{backgroundColor:bgColor, borderRadius:'0px'}}>
      <b>{eventInfo.timeText}</b>
      <b>{eventInfo.event.title}</b>
    </div>
  );
};

const Sidebar = ({ weekendsVisible, handleWeekendsToggle, currentEvents }) => {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          />
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
  );
};

const SidebarEvent = ({ event }) => {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
};




export default DemoApp;
