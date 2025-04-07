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
                        <hr></hr>
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

                        <hr></hr>
                        <hr></hr>

                        <hr></hr>
                        <hr></hr>



                        <div className={bstyle.gasyclick}>
                            <div className={bstyle.standardwrite10}>글쓰기</div>


                            <div className={bstyle.titlewrite}>
                                <div className={bstyle.title2}>작성자</div>
                                <div className={bstyle.text2}>작성자 ID
                                </div>
                            </div>

                            <div className={bstyle.titlewrite}>
                                <div className={bstyle.title2}>제목</div>
                                <div className={bstyle.text2}>제목내용</div>

                            </div>
                            <div className={bstyle.file}>
                                <div className={bstyle.text2}>📥 파일다운로드</div>
                            </div>
                            <div className={bstyle.contentwrite}>
                                내용
                            </div>
                            <div className={bstyle.good2}>
                                <button className={bstyle.thumbsbutton}>
                                    <div className={bstyle.finger}>👍</div>
                                    <div className={bstyle.plus}>+n</div>
                                </button>
                            </div>
                            <div className={bstyle.buttoncontainer}>
                                <div className={bstyle.list3}><button>목록으로</button></div>
                                <div className={bstyle.rightbuttons}>
                                    <div className={bstyle.list4}><Link to="/mainpage/maincontent/write_update"><button>수정</button></Link></div>
                                    <div className={bstyle.list5}><button>삭제</button></div>
                                </div>
                            </div>

                        </div>
                        {/* 댓글 */}
                        <div className={bstyle.comment2}>
                            <div className={bstyle.comment3}>댓글</div>
                            <div className={bstyle.commentwrite}>
                                <div className={bstyle.profile}>프로필 사진</div>
                                <div className={bstyle.userwrite}>
                                    <div className={bstyle.nametime}>
                                        <div className={bstyle.name3}>이름</div>
                                        <div className={bstyle.writetime3}>작성시간</div>
                                    </div>
                                    <div className={bstyle.content4}>댓글내용</div>
                                </div>
                            </div>
                            <div className={bstyle.commentwrite2}>
                                <textarea placeholder="내용을 입력하세요"></textarea>
                                <button className={bstyle.okbutton}>확인</button>
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