import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bstyle from './Board_reference.module.css';

const Board_reference = () => {
    const [group, setGroup] = useState([]);


    useEffect(() => {
        axios.get('http://10.5.5.12/board')
            .then(response => {
                console.log("응답 성공", response.data);
                setGroup(response.data);
            })
            .catch(error => {
                console.error("🔥 오류 발생:", error);
            });
    }, []);




    return (
        <div className={bstyle.SBoardContainer}>

            <div className={bstyle.subcontainer}>



                <h2>📄 게시판</h2>
                <div className={bstyle.approval}>
                    <table className={bstyle.container}>
                        <thead>
                            <tr className={bstyle.navi}>
                                <th>자료실</th>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="🔍게시글 입력"></input></td>
                                <td>
                                    <select>
                                        <option value="option1">최신순</option>
                                        <option value="option2">조회순</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className={bstyle.list}>


                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                                <th>추천수</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                group.map((message, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{message.post_id}</td>
                                            <td>
                                            <Link to={`/mainpage/maincontent/titlelink/${message.post_id}`}>{message.post_title}</Link>
                                           </td>
                                            <td>{message.post_writer}</td>
                                            <td>{message.post_date}</td>
                                            <td>{message.post_view}</td>
                                            <td>{message.post_like}</td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                        
                    </table>
                    <div className={bstyle.writeButton}><Link to="/mainpage/maincontent/write_button" state={{ name: "board" }}> <button>작성하기</button></Link></div>
                </div>
               
            </div>
            
        </div >


    );
};
export default Board_reference;