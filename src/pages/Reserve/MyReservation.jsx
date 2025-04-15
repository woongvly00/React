import myResvStyle from './MyReservation.module.css';
import { useEffect, useState } from 'react';
import caxios from '../../Utils/caxios';




const MyReservation = () => {

    const [selected, setSelected] = useState(110);
    const [ myReservation, setMyReservation ] = useState([]);
    const [userInfo,setUserInfo] = useState(null);
    useEffect(()=>{
        caxios.get("/mypage/info").then((resp)=>{
          const info = resp.data;
          setUserInfo(info);
          
          console.log("인포 값 확인 : " + info.emp_code_id);
    
        }).catch((error) => {
            console.error("실패", error);
        });
    
        
    }, [])

    useEffect (() => {
        if (!userInfo) return;
        caxios.get(`/reserve/myResv/${userInfo.emp_code_id}`).then((resp) => {
            console.log("🔥 서버에서 받아온 예약 목록 원본:", resp.data);
          
            const formatResev = resp.data.map((resv) => {
               return {
                id: resv.resv_id,
                title: resv.resv_title,
                date: resv.resv_date,
                startTime: resv.resv_stime,
                endTime: resv.resv_etime,
                emp_id: resv.resv_emp,
                category: resv.resc_type_id,
                resc_name : resv.resc_name
              };
            });
          
            setMyReservation(formatResev);
          }).catch((error) => {
            console.error("예약목록 불러오기 실패", error);
          });

    }, [userInfo])

    
    const filteredReservations = myReservation.filter(r => r.category === selected);

    return (
        <div>
            <div className={myResvStyle['reserve-page']}>
                <h2>나의 예약 목록</h2>
                <div className={myResvStyle['category-tabs']}>
                    <button className={selected === 110 ? myResvStyle.active : ''} onClick={() => setSelected(110)}>회의실</button>
                    <button className={selected === 120 ? myResvStyle.active : ''} onClick={() => setSelected(120)}>차량</button>
                    <button className={selected === 130 ? myResvStyle.active : ''} onClick={() => setSelected(130)}>비품</button>
                </div>
                <div className={myResvStyle['card-list']}>
                {filteredReservations.length === 0 ? (
                    <h4 className={myResvStyle['empty-msg']}>예약된 내역이 없습니다.</h4>
                ) : (
                    filteredReservations.map((resv, idx) => (
                    <div key={idx} className={myResvStyle['resv-card']}>
                        <h3>{resv.title}</h3>
                        <p>{resv.date} / {resv.startTime} ~ {resv.endTime}</p>
                        <p className={myResvStyle['category']}>{resv.resc_name}</p>
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>
    )
}

export default MyReservation;
