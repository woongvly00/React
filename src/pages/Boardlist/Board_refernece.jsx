import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board_reference.css';

const Board_reference = () => {
    const [group, setGroup] = useState([]);


        useEffect(() => {
            axios.get('http://10.5.5.6/board/list')
                .then(response => {
                    console.log("응답 성공", response.data);
                    setGroup(response.data);
                })
                .catch(error => {
                    console.error("🔥 오류 발생:", error);
                });
        }, []);
     



    return (
        <div className="SBoardContainer">

            <div className="subcontainer">



                <h2>📄 게시판</h2>
                <div className="approval-grid">
                    <table className="cotainer">
                        <thead>
                            <tr className="navi">
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
                            <tr className="list">


                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                       
                        {
        group.map((message,index) => {
          return(
            <tr key={index}>
            <td>{message.board_id}</td>
            <td>{message.board_title}</td>
            <td>{message.board_name}</td>
            <td>{message.board_write_date}</td>
            <td>{message.board_view}</td>
          </tr>
          );
        })
        }

                        </tbody>
                    </table>
                </div>
            </div>

        </div >


    );
};
export default Board_reference;