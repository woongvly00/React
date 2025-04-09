import React, { useState, useEffect } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import calenderStyle from './DemoApp.module.css';
import caxios from '../../Utils/caxios';
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
    color: '',
    c_id: 1,
    emp_id: 0
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
          c_id: event.c_id,
          color: event.color
        }
      }));
    setEvents(getAllevents);
    })
    
  }, [])

  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const [myInfo,setMyInfo] = useState(null);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    let mine = null;

      caxios.get("/Employee/SelectMine",{
        params: {userId: userId}
      }).then((userIdResp)=>{
        mine = userIdResp.data;
        setMyInfo(mine);
        
        setEventInput((prev) => ({
          id: '',
          title: '',
          start_date: '',
          end_date: '',
          startTime: '',
          endTime: '',
          content: '',
          c_id: 1, 
          emp_id : mine.emp_code_id
        }));
          
      });

   
  }, []);




  const handleInput = (e) => {
    const { name, value } = e.target;
    
    setEventInput((prev) => ({ ...prev, [name]: name === 'c_id' ? Number(value) : value }));
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setIsModalOpen(true);
    
  };

  const [jobId, setJobId] = useState(0);

  const handleAddEvent = () => {
    
    const calendarApi = selectedInfo.view.calendar;
    calendarApi.unselect();

    const newEvent = {
      id: Date.now().toString(),
      c_id: eventInput.c_id,
      title: eventInput.title,
      start: `${eventInput.start_date}T${eventInput.startTime}`,
      end: `${eventInput.end_date}T${eventInput.endTime}`,
      allDay: false,
      color:`${eventInput.color}`,
      extendedProps: {
        content: eventInput.content,
        c_id: eventInput.c_id,
        emp_id: eventInput.emp_id
      }
    };

    caxios.get("/mypage/info").then((resp) => setJobId(resp.job_id));

    addEvent(newEvent);
    calendarApi.addEvent(newEvent);


    caxios.post("/schedule", eventInput).catch((error) => {
      if (error.response?.status === 404 || 500) {
        alert("등록에 실패했습니다.");
      }
    });

    setIsModalOpen(false);
    setEventInput({
      id: '', title: '', start_date: '', end_date: '', startTime: '', endTime: '', content: '', c_id: 1
    });

    

  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);


  const handleEventClick = (clickInfo) => {

    caxios.get(`/schedule/${clickInfo.event.id}`).then((resp) => {

      const getEvent = resp.data;
      const formattedEvent = {
        id:getEvent.id,
        c_id:getEvent.c_id,
        title: getEvent.title,
        start_date: `${getEvent.start_date}T${getEvent.startTime}`,
        end_date: `${getEvent.end_date}T${getEvent.endTime}`,
        startTime: `${getEvent.startTime}`,
        endTime: `${getEvent.endTime}`,
        content: `${getEvent.content}`,
        emp_id: getEvent.emp_id,
        color: `${getEvent.color}`
        
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
        id: selectedEvent.id || 0,
        c_id : selectedEvent.c_id || '',
        title: selectedEvent.title || '',
        start_date: selectedEvent.start_date || '',
        end_date: selectedEvent.end_date || '',
        startTime: formatTime(selectedEvent.startTime) || '',
        endTime: formatTime(selectedEvent.endTime) || '',
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
    caxios.put(`/schedule/${update.id}`, update).then(resp => {
      
      
    });
    setIsEditing(false);
    setSelectedEvent(update);
    setIsDetailOpen(false);
  };
  
  const [isEditing, setIsEditing] = useState(false);

  const [ calList, setCalList ] = useState([]);
  useEffect(() => {
    caxios.get('/calendar').then((resp) => {
      console.log(resp.data);
      setCalList(resp.data);
      
    });
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
  };

  

  

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
             <select name="c_id" value={eventInput.c_id} onChange={handleInput}>
                 <option value="">캘린더 선택</option>

                 {
                  // 일정 추가 시 캘린터 선택지에 직급에 따라 필터링 거는 중 (회사캘린더의 경우 팀장 이상만 일정 추가 가능)
                   calList
                   .filter((calender) => {
                    if (calender.public_code == 30) {
                      return jobId >= 1007;
                   }
                   
                   return true;
                  })
                   .map((calender) => (
                    <option key={calender.c_id} value={calender.c_id}>
                      {calender.c_title}
                    </option>
                  ))
                 }
             </select>
         </div>
         <div>
             일정 제목
             <input
             type="text"
             name="title"
             value={eventInput.title}
             onChange={handleInput}
             placeholder="일정 제목 입력"
             autoFocus
             />
         </div>
         <div>
             시작일
             <input name="start_date" type="date" value={eventInput.start_date} onChange={handleInput} />
             종료일
             <input name="end_date" type="date" value={eventInput.end_date} onChange={handleInput} />
             
         </div>
         <div>
             시작시간
             <select name="startTime" value={eventInput.startTime} onChange={handleInput}>
             {Array.from({ length: 48 }).map((_, index) => {
                 const h = String(Math.floor(index / 2)).padStart(2, '0');
                 const m = index % 2 === 0 ? '00' : '30';
                 const time = `${h}:${m}`;
                 return <option key={time} value={time}>{time}</option>;
             })}
             </select>
             종료시간
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
             <textarea
             name="content"
             value={eventInput.content}
             onChange={handleInput}
             placeholder="내용 입력"
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
              <h2>일정 수정</h2>

              {isEditing ? (<>
                <input type="hidden" name="id" value={update.id} />
                <div><strong>제목:</strong><input type="text" name="title" value={update.title} onChange={handleUpdate} placeholder="일정 제목 입력" autoFocus/></div>
                <div>
                  시작일<input name="start_date" type="date" value={update.start_date } onChange={handleUpdate} />
                  종료일<input name="end_date" type="date" value={update.end_date } onChange={handleUpdate} />
                </div>
                <div>
                  시작시간
                  <select name="startTime" value={update.startTime || ''} onChange={handleUpdate}>
                    {Array.from({ length: 48 }).map((_, index) => {
                      const h = String(Math.floor(index / 2)).padStart(2, '0');
                      const m = index % 2 === 0 ? '00' : '30';
                      const time = `${h}:${m}`;
                      return <option key={time} value={time}>{time}</option>;
                    })}
                  </select>
                  종료시간
                  <select name="endTime" value={update.endTime || ''} onChange={handleUpdate}>
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
                {/* <div>{selectedEvent.id}</div> */}
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
