import React, { useEffect,  useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import caxios from '../../Utils/caxios';
import { sliceEvents } from '@fullcalendar/core';
import rStyle from './MettingRoom.module.css';
import InputResev from './InputResv'



const MeetingRoom = ()=> {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [ resouceList, setResourceList ] = useState([]);
    const [ targetResc, setTargetResc ] = useState(0);

    const handleDateSelect = (selectInfo) => {
        setSelectedInfo(selectInfo);
        setIsModalOpen(true);
      };

      const events = [
        {
            id: '1',
            title: '회의: 프로젝트 킥오프',
            start: '2025-04-04T10:00:00',
            end: '2025-04-04T11:30:00',
          }
      ]

     
      useEffect(() => {
        
        caxios.get(`/reserve/resources`).then((resp)=>{
            setResourceList(resp.data);
        }).catch((error) => {
            console.error("자원 정보 불러오기 실패", error);
        })
      
    }, [])
    

    return (
        <div>
        <div className={rStyle.reservTable}>
            <div>
                회의실 예약 현황 조회
                <br></br>
                <select onChange={(e) => setTargetResc(e.target.value)}>
                    {resouceList.map((resc, index) => (
                        <option key={index} value={resc.resc_id}>
                        {resc.resc_name}
                        </option>
                    ))}
                </select>
                
            </div>
            <div>
            <table>
                <thead>
                    <tr>
                    <th>수용인원</th>
                    <th>위치</th>
                    <th>사용 가능 여부</th>
                    <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         resouceList
                         .filter((resource) => resource.resc_id == targetResc)
                         .map((resource, index) => (
                           <tr key={index}>
                             <td>{resource.resc_capacity}</td>
                             <td>{resource.resc_location}</td>
                             <td>{resource.resc_status}</td>
                             <td>{resource.resc_description}</td>
                           </tr>
                         ))
                    }
                </tbody>
                </table>
            </div>
        <div>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            allDaySlot={false} 
            initialView='timeGridWeek'
            slotMinTime="08:00:00"
            slotMaxTime="24:00:00"
            slotDuration="00:30:00"
            
            headerToolbar={{
                left: '',
                center: 'prev today next',
                right: 'dayGridMonth,timeGridWeek'
            }}
            
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            events={events}
            />
            </div>
        </div>
        
        {isModalOpen && (<InputResev closeModal={() => setIsModalOpen(false)} selectedInfo={selectedInfo} resourceId={targetResc}/>)}
        
        </div>
    )
};


export default MeetingRoom;