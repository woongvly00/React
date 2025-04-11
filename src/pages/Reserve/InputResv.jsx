
import React, { useState } from 'react';
import resvStyle from './InputReserv.module.css'
import caxios from '../../Utils/caxios';



const InputResev = ({ closeModal, selectedInfo }) => {
    console.log("모달 열림", selectedInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resvInput, setResvInput] = useState({
    resv_id : 0,
    resource_id : 0,
    resv_emp: 0,
    resv_date:'',
    resv_stime: '',
    resv_etime: '',
    resv_title: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setResvInput((prev) => ({ ...prev, [name]: value }));
  };


  const AddReservation = () => {
    
    setResvInput({
      resource_id : 0,
      resv_emp: 0,
      resv_date:`${resvInput.start}T${resvInput.startTime}`,
      resv_stime: `${resvInput.startTime}`,
      resv_etime: `${resvInput.endTime}`,
      resv_title: resvInput.title
    })

    caxios.post("/reserve/addReserve", resvInput).catch((error) =>{

    })
    closeModal();

    };



    return (
        <div className={resvStyle['modal-overlay']}>
          <div className={resvStyle['modal-container']}>
            <h2>예약 하기</h2>
            
            <div>
              날짜
              <input name="start" type="date" value={resvInput.start} onChange={handleInput} />
            </div>
            <div>
              예약 시간<br></br>
              시작
              <select name="startTime" value={resvInput.startTime} onChange={handleInput}>
                {Array.from({ length: 32 }, (_,i) => i +16).map((index) => {
                  const h = String(Math.floor(index / 2)).padStart(2, '0');
                  const m = index % 2 === 0 ? '00' : '30';
                  const time = `${h}:${m}`;
                  return <option key={time} value={time}>{time}</option>;
                })}
              </select>
              <br></br>
              종료
              <select name="endTime" value={resvInput.endTime} onChange={handleInput}>
                {Array.from({ length: 32 }, (_,i) => i +16).map((index) => {
                  const h = String(Math.floor(index / 2)).padStart(2, '0');
                  const m = index % 2 === 0 ? '00' : '30';
                  const time = `${h}:${m}`;
                  return <option key={time} value={time}>{time}</option>;
                })}
              </select>
            </div>
            <div>
              사용 목적
              <textarea
                name="title"
                value={resvInput.title}
                onChange={handleInput}
              />
            </div>
            <div className={resvStyle['modal-buttons']}>
              <button onClick={AddReservation}>저장</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )
}

export default InputResev;