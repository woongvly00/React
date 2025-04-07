import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import './Board_reference.css';

const Board_reference = () => {


return(
<div className="SBoardContainer">

    <div className="subcontainer">



        <h2>📄 게시판</h2>
        <div className="approval-grid">
        <table className="cotainer">
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
            <hr></hr>
            <tr className="list">

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
export default Board_reference;