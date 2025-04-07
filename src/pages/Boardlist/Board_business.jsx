import React from 'react';
import './Board_business.css';

const Board_business = () => {

    return (
        <table className="SBoardContainer">

            <table className="subcontainer">



                <h2>📄 게시판</h2>
                <table className="approval-grid">
                    <table className="cotainer">
                        <tr className="navi">
                            <th>거래처별 변경사항</th>
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
                </table>
            </table>


        </table>

    );
};
export default Board_business;