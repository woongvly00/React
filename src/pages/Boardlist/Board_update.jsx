import './Board_update.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';



const Board_update = () => {

    const [update,setUpdate]=useState([]);
    const [message,setMessage]=useState({title:"",content:""});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setMessage((prev)=>({...prev,[name]:value}));
    }

    const handleAdd=()=>{
        const result=update.map((message)=>{
            if(message.board_id=-)
        })
    }


    return (
        <div className="SBoardContainer">

            <div className="subcontainer">



                <h2>📄 게시판</h2>
                <div className="approval-grid">
                    <div className="container2">
                        <div className="standardwrite10">글쓰기</div>
                        <div className="signcancel">
                            <button onClick={handleAdd}>등록</button>
                            <Link to="/mainpage/maincontent/standard"><button>취소</button></Link>
                        </div>
                        <div className="gasyselect">
                            <div className="gasywrite">게시판</div>
                            <div className="selects">
                                <select>
                                    <option value="option1">자유 게시판</option>
                                    <option value="option2">동아리 게시판</option>
                                    <option value="option3">부서 게시판</option>
                                    <option value="option4">거래처별 변경사항</option>
                                    <option value="option5">업체교육/업무지원 보고서</option>
                                    <option value="option6">신규 아이디어 상품건의</option>
                                </select>
                            </div>
                        </div>
                        <div className="titlewrite">
                            <div className="title2">제목</div>
                            <div className="text2"><input type="text" placeholder="제목을 입력하세요" onChange={handleChange} value={encodeURIComponent.id}></input></div>
                            <div className="checkbox2">
                                <label>
                                    <input type="checkbox" />
                                    공지로 등록
                                </label>
                            </div>
                        </div>
                        <div className="file">
                            <input type="file"></input>
                        </div>
                        {/* <div className="contentwrite"> */}
                            <textarea>툴바</textarea>
                        {/* </div> */}

                      
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Board_update;