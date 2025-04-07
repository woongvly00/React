import './Board_standard.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import Board_reference from './Board_reference';
// import Sidelist from '../../Components/Sidelist';


const Boardlist = () => {


    return (



        <div className="SBoardContainer">

            <div className="subcontainer">



                <h2>📄 게시판</h2>
                <div className="approval-grid">
                    <table className="cotainer">
                        <tr className="navi">
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

                        <hr></hr>
                        <hr></hr>

                        <hr></hr>
                        <hr></hr>



                        <div className="gasyclick">
                            <div className="standardwrite10">글쓰기</div>


                            <div className="titlewrite">
                                <div className="title2">작성자</div>
                                <div className="text2">작성자 ID
                                </div>
                            </div>

                            <div className="titlewrite">
                                <div className="title2">제목</div>
                                <div className="text2">제목내용</div>

                            </div>
                            <div className="file">
                                <div className="text2">📥 파일다운로드</div>
                            </div>
                            <div className="contentwrite">
                                내용
                            </div>
                            <div className="good2">
                                <button className="thumbs-button">
                                    <div className="finger">👍</div>
                                    <div className="plus">+n</div>
                                </button>
                            </div>
                            <div className="button-container">
                                <div className="list3"><button>목록으로</button></div>
                                <div className="right-buttons">
                                    <div className="list4"><button>수정</button></div>
                                    <div className="list5"><button>삭제</button></div>
                                </div>
                            </div>
                        </div>


                        {/* 댓글 */}
                        <div className="comment2">
                            <div className="comment3">댓글</div>
                            <div className="commentwrite">
                                <div className="profile">프로필 사진</div>
                                <div className="userwrite">
                                    <div className="nametime">
                                        <div className="name3">이름</div>
                                        <div className="writetime3">작성시간</div>
                                    </div>
                                    <div className="content4">댓글내용</div>
                                </div>
                            </div>
                            <div className="commentwrite2">
                                <textarea placeholder="내용을 입력하세요"></textarea>
                                <button className="okbutton">확인</button>
                            </div>
                        </div>


                        <hr></hr>
                        <hr></hr>


                    </table>


                </div>

            </div>
        </div>







    );
};

export default Boardlist;