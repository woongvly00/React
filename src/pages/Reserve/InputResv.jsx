
import React, { useState, useEffect } from 'react';
import resvStyle from './InputReserv.module.css'
import caxios from '../../Utils/caxios';



const InputResev = ({ closeModal, selectedInfo, resourceId }) => {
  useEffect(() => {
    console.log("넘어온 리소스:", resourceId);
  }, [resourceId]);
  

  const [ userInfo, setUserInfo ] = useState({});
  useEffect(()=>{
      caxios.get("/mypage/info").then((resp)=>{
        const info = resp.data;
        console.log(info);
        setUserInfo(info);
      }).catch((error) => {
          console.error("실패", error);
      });
  }, [])

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
    const reservation = {
      resv_id: 0,
      resource_id: Number(resourceId),
      resv_emp: userInfo.emp_code_id,
      resv_date: `${resvInput.resv_date}`,
      resv_stime: `${resvInput.resv_stime}`,
      resv_etime: `${resvInput.resv_etime}`,
      resv_title: resvInput.resv_title
    };
    console.log("저장 전 예약 내용:", reservation);
    caxios.post("/reserve/addReserve", reservation).catch((error) =>{
      console.error("예약 실패:", error);
    })
    closeModal();

    };



    return (
        <div className={resvStyle['modal-overlay']}>
          <div className={resvStyle['modal-container']}>
            <h2>예약 하기</h2>
            
            <div>
              날짜
              <input name="resv_date" type="date" value={resvInput.resv_date} onChange={handleInput} />
            </div>
            <div>
              예약 시간<br></br>
              시작
              <select name="resv_stime" value={resvInput.resv_stime} onChange={handleInput}>
                {Array.from({ length: 32 }, (_,i) => i +16).map((index) => {
                  const h = String(Math.floor(index / 2)).padStart(2, '0');
                  const m = index % 2 === 0 ? '00' : '30';
                  const time = `${h}:${m}`;
                  return <option key={time} value={time}>{time}</option>;
                })}
              </select>
              <br></br>
              종료
              <select name="resv_etime" value={resvInput.resv_etime} onChange={handleInput}>
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
                name="resv_title"
                value={resvInput.resv_title}
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