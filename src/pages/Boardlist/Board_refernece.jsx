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
                    <table className={bstyle.cotainer}>
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
                            </tr>
                        </thead>
                        <tbody>

                            {
                                group.map((message, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{message.board_id}</td>
                                            <Link to={`/mainpage/maincontent/titlelink/${message.board_id}`}>{message.board_title}</Link>
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