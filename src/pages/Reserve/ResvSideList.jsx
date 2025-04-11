import React, { useState, useEffect } from 'react';
import caxios from '../../Utils/caxios';

const ResvSideList = ({ closeModal }) => {

    const [userInfo, setUserInfo ] = useState(null);
    
    useEffect(()=>{
        caxios.get("/mypage/info").then((resp)=>{
            setUserInfo(resp.data);
        }).catch((error) => {
            console.error("실패", error);
        });
        
    }, [])

    const getResources = () => {

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
                                // 자원 이름 리스트
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
                                // 자원 이름 리스트
                            }
                        </div>
                    </div>
                </div>            
            </div>
            
        </div>
    )


}



export default ResvSideList;


