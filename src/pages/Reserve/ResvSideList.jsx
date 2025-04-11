import React, { useState, useEffect } from 'react';
import caxios from '../../Utils/caxios';

const ResvSideList = ({ closeModal }) => {


    const [ rescList, setRescList ] = useState([]);


    const getResources = () => {
        caxios.get("/reserve/resourceType").then((resp) => {
            setRescList(resp.data);
        }).catch((error) => {
            console.error("자원유형 불러오기 실패", error);
        })

    }



    return (
        <div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={getResources}>
                            자원 예약
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {
                                rescList.map((resc, index) => (
                                    <div key={index}>
                                        {resc.resc_type}
                                    </div>
                                  ))
                            }
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={getResources}>
                            내 예약 목록
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {
                                rescList.map((resc, index) => (
                                    <div key={index}>{resc.resc_type}</div>
                                  ))
                            }
                        </div>
                    </div>
                </div>            
            </div>
            
        </div>
    )


}



export default ResvSideList;


