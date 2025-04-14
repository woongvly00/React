import myResvStyle from './MyReservation.module.css';
import { useState } from 'react';




const MyReservation = () => {
    const [selected, setSelected] = useState('회의실');
    // const allReservations =() => {
    //     caxios.get(`/reserve/reservations`).then((resp) => {
    //         const fixDate = (dateStr) => dateStr.replace(/[./]/g, '-');
    //         const formatResev = resp.data.map((resv) => {
    //           const startStr = `${fixDate(resv.resv_date)}T${resv.resv_stime}`;
    //           const endStr = `${fixDate(resv.resv_date)}T${resv.resv_etime}`;
          
    //           return {
    //             id: resv.resv_id,
    //             title: resv.resv_title,
    //             start: startStr,
    //             end: endStr,
    //             startTime:resv.resv_stime,
    //             endTime: resv.resv_eTime,
    //             allDay: false,
    //             extendedProps: {
    //               emp_id: resv.resv_emp,
    //               resource_id: resv.resource_id
    //             }
    //           };
    //         });

    // }

    const allReservations =[
        { title: '회의실 예약 1', date: '2024-04-30', startTime: '10:00', endTime: '11:00', category: '회의실', status: '승인됨' },
        { title: '차량 예약 A', date: '2024-05-01', startTime: '09:00', endTime: '10:00', category: '차량', status: '진행 중' },
        { title: '비품 예약 B', date: '2024-05-02', startTime: '14:00', endTime: '15:30', category: '비품', status: '승인됨' },
        
      ];
    const filteredReservations = allReservations.filter(r => r.category === selected);

    return (
        <div>
            <div className={myResvStyle['reserve-page']}>
                <h2>나의 예약 목록</h2>
                <div className={myResvStyle['category-tabs']}>
                    <button className={selected === '회의실' ? myResvStyle.active : ''} onClick={() => setSelected('회의실')}>회의실</button>
                    <button className={selected === '차량' ? myResvStyle.active : ''} onClick={() => setSelected('차량')}>차량</button>
                    <button className={selected === '비품' ? myResvStyle.active : ''} onClick={() => setSelected('비품')}>비품</button>
                </div>
                <div className={myResvStyle['card-list']}>
                    {filteredReservations.map((resv, idx) => (
                    <div key={idx} className={myResvStyle['resv-card']}>
                        <h3>{resv.title}</h3>
                        <p>{resv.date} / {resv.startTime} ~ {resv.endTime}</p>
                        <p className={myResvStyle['category']}>{resv.category}</p>
                        <p className={myResvStyle['status']}>{resv.status}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyReservation;
