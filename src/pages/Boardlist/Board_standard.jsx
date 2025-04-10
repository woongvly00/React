import bstyle from './Board_standard.module.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import Board_reference from './Board_reference';
// import Sidelist from '../../Components/Sidelist';


const Boardlist = () => {


    return (



        <div className={bstyle.SBoardContainer}>

            <div className={bstyle.subcontainer}>



                <div>📄 게시판</div>
                <div className={bstyle.approval}>
                    <table className={bstyle.cotainer}>
                        <tr className={bstyle.navi}>
                            <th>공지사항</th>
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

                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                            <tr>
                                <td>글</td>
                                <td>글</td>
                                <td>글</td>
                                <td>글</td>
                                <td>글</td>
                            </tr>
                            <tr>
                                <td>글</td>
                                <td>글</td>
                                <td>글</td>
                                <td>글</td>
                                <td>글</td>
                            </tr>
                        </tr>

                    </table>


                </div>

            </div>
        </div>







    );
};

export default Boardlist;