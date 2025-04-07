
import React, { useState } from 'react';
import resvStyle from './InputReserv.module.css'



const InputResev = ({ closeModal, selectedInfo }) => {
    console.log("모달 열림", selectedInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInput, setEventInput] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    startTime: '',
    endTime: '',
    content: '',
    category_id: 1,
    color: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEventInput((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddEvent = () => {
    
    setEventInput({
        id: 1234,
        start:`${eventInput.start}T${eventInput.startTime}`,
        startTime: `${eventInput.startTime}`,
        endTime:`${eventInput.endTime}`,
        title:eventInput.title
    })
    closeModal();

    };



    return (
        <div className={resvStyle['modal-overlay']}>
          <div className={resvStyle['modal-container']}>
            <h2>회의실 예약</h2>
            
            <div>
              날짜
              <input name="start" type="date" value={eventInput.start} onChange={handleInput} />
            </div>
            <div>
              예약 시간<br></br>
              시작
              <select name="startTime" value={eventInput.startTime} onChange={handleInput}>
                {Array.from({ length: 48 }).map((_, index) => {
                  const h = String(Math.floor(index / 2)).padStart(2, '0');
                  const m = index % 2 === 0 ? '00' : '30';
                  const time = `${h}:${m}`;
                  return <option key={time} value={time}>{time}</option>;
                })}
              </select>
              <br></br>
              종료
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
              사용 용도
              <textarea
                name="title"
                value={eventInput.title}
                onChange={handleInput}
              />
            </div>
            <div className={resvStyle['modal-buttons']}>
              <button onClick={handleAddEvent}>저장</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )
}

export default InputResev;