import React, { useState, useEffect } from 'react';
import caxios from '../../Utils/caxios';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import './ResvSideList.css';

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
        <div className="accordionContainer">
            <div className="accordion" id="accordionExample">

                <div className="accordion-item">
                <Link className="myReservationLink" to={`/mainpage/maincontent/reserve/myReservation`}>
                    내 예약 목록
                </Link>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="false" aria-controls="collapseOne" onClick={getResources}>
                    자원 예약
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                    <div className="accordion-body">
                    {rescList.map((resc, index) => (
                        <Link className="rescLink" to={`/mainpage/maincontent/reserve/${resc.resc_type_id}`} key={index}>
                        {resc.resc_type}
                        </Link>
                    ))}
                    </div>
                </div>
                </div>

                
            </div>
        </div>
    )


}



export default ResvSideList;


