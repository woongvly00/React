import myResvStyle from './MyReservation.module.css';
import { useState } from 'react';
import caxios from '../../Utils/caxios';




const MyReservation = () => {
    const [selected, setSelected] = useState('회의실');
    const [ myReservation, setMyReservation ] = useState([]);
    const allReservations =() => {
        caxios.get(`/reserve/reservations`).then((resp) => {
            console.log("🔥 서버에서 받아온 예약 목록 원본:", resp.data);
          
            const fixDate = (dateStr) => dateStr.replace(/[./]/g, '-');
          
            const formatResev = resp.data.map((resv) => {
              const startStr = `${fixDate(resv.resv_date)}T${resv.resv_stime}`;
              const endStr = `${fixDate(resv.resv_date)}T${resv.resv_etime}`;
              const startDate = new Date(startStr);
              const endDate = new Date(endStr);
          
               return {
                id: resv.resv_id,
                title: resv.resv_title,
                date: startStr,
                end: endStr,
                startTime: resv.resv_stime,
                endTime: resv.resv_etime,
                allDay: false,
                extendedProps: {
                  emp_id: resv.resv_emp,
                  category: resv.resource_id
                }
              };
            });
          
            setMyReservation(formatResev);
          }).catch((error) => {
            console.error("예약목록 불러오기 실패", error);
          });

    }

    
    const filteredReservations = myReservation.filter(r => r.category === selected);

    return (
        <div>
            <div className={myResvStyle['reserve-page']}>
                <h2>나의 예약 목록</h2>
                <div className={myResvStyle['category-tabs']}>
                    <button className={selected === '110' ? myResvStyle.active : ''} onClick={() => setSelected('110')}>회의실</button>
                    <button className={selected === '120' ? myResvStyle.active : ''} onClick={() => setSelected('120')}>차량</button>
                    <button className={selected === '130' ? myResvStyle.active : ''} onClick={() => setSelected('130')}>비품</button>
                </div>
                <div className={myResvStyle['card-list']}>
                    {filteredReservations.map((resv, idx) => (
                    <div key={idx} className={myResvStyle['resv-card']}>
                        <h3>{resv.title}</h3>
                        <p>{resv.date} / {resv.startTime} ~ {resv.endTime}</p>
                        <p className={myResvStyle['category']}>{resv.category}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyReservation;
