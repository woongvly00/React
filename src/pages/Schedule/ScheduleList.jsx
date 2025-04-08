import React, { useState, useEffect } from 'react';
import AddCategory from './AddCategory';
import caxios from '../../Utils/caxios';

const ScheduleList = ({ closeModal }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedInfo, setSelectedInfo] = useState(null);
    
    
      const handleModalOpen = (selectInfo) => {
        setSelectedInfo(selectInfo);
        setIsModalOpen(true);
      };
    
      
      const [getMyCalendar, setMyCalendar] = useState([]);
      const [getPublicCalendar, setPublicCalendar] = useState([]);
      const [getComCalendar, setGetComCalendar] = useState([]);

      const handleMyCal = () => {
        caxios.get("/calendar/myCal", {
            params: {
              public_code: 10  
            }}
        ).then((resp) => {
            setMyCalendar(resp.data);
            console.log(getMyCalendar.c_title);
            console.log(getMyCalendar.c_id);
        })};

        const handlePublicCal = () => {
            caxios.get("/calendar/publicCal", {
                params: {
                  public_code: 20  
                }}
            ).then((resp) => {
                setPublicCalendar(resp.data);
                console.log(getPublicCalendar.c_title);
                console.log(getPublicCalendar.c_id);
            })};

        
            const handleComCal = () => {
                caxios.get("/calendar/comCal", {
                    params: {
                      public_code: 30  
                    }}
                ).then((resp) => {
                    setGetComCalendar(resp.data);
                    console.log(getComCalendar.c_title);
                    console.log(getComCalendar.c_id);
                })};
    



    return (
        <div>
            <div>
                커스텀뷰 넣기
            </div>

            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={handleMyCal}>
                            내 캘린더
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {
                                getMyCalendar.map((calendar) => (
                                    <div key={calendar.c_id}><input type="checkbox"></input><strong>{calendar.c_title}</strong></div>
                                  ))
                            }
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={handlePublicCal}>
                            공유 캘린더
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {
                                getPublicCalendar.map((calendar) => (
                                    <div key={calendar.c_id}><input type="checkbox"></input><strong>{calendar.c_title}</strong></div>
                                  ))
                            }
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={handleComCal}>
                            회사 캘린더
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {
                                getComCalendar.map((calendar) => (
                                    <div key={calendar.c_id}><input type="checkbox"></input><strong>{calendar.c_title}</strong></div>
                                  ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handleModalOpen}>캘린더 추가</button>

            </div>
            {isModalOpen && (<AddCategory closeModal={() => setIsModalOpen(false)} selectedInfo={selectedInfo} />)}
        </div>
    )


}



export default ScheduleList;


