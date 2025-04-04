import style from './Board_standard.module.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import Board_reference from './Board_reference';
// import Sidelist from '../../Components/Sidelist';


const Boardlist = () => {


    return (



        <div className={style.SBoardContainer}>

            <div className={style.subcontainer}>



                <h2>📄 게시판</h2>
                <div className={style.approvalgrid}></div>
                <table className={style.cotainer}>
                    <tr className={style.navi}>
                        <th>공지사항, 자료실, 부서 게시판, 거래처별 변경사항, 업체교육/업무지원보고서</th>
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
                    <tr className={style.alist}>

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
                    <div className={style.navi}>
                        <th>자유 게시판, 동아리 게시판</th>

                    </div>
                    <div className={style.navibelow}>
                        <div className={style.navibelowleft}><input type="text" placeholder="🔍게시글 입력"></input></div>
                        <div className={style.navibelowright}>
                            <select>
                                <option value="option1">최신순</option>
                                <option value="option2">조회순</option>
                                <option value="option3">추천순</option>
                            </select>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={style.freelist}>

                        <div className={style.photo}>

                            사진
                        </div>
                        <div className={style.write}>
                            <div className={style.title}>제목</div>
                            <div className={style.content}>내용</div>
                            <div className={style.writeElse}>
                                <div className={style.writer}>작성자</div>
                                <div className={style.good}>추천수</div>
                                <div className={style.look}>조회수</div>
                                <div className={style.writeTime}>현재 시간</div>
                            </div>
                        </div>

                    </div>
                    <hr></hr>
                    <hr></hr>
                    {/* 스탠다드 게시판 글쓰기 작성 */}
                    <div className={style.container2}>
                        <div className={style.standardwrite10}>글쓰기</div>
                        <div className={style.signcancel}>
                            <button>등록</button>
                            <button>취소</button>
                        </div>
                        <div className={style.gasyselect}>
                            <div className={style.gasywrite}>게시판</div>
                            <div className={style.selects}>
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
                        <div className={style.titlewrite}>
                            <div className={style.title2}>제목</div>
                            <div className={style.text2}><input type="text" placeholder="제목을 입력하세요"></input></div>
                            <div className={style.checkbox2}>
                                <label>
                                    <input type="checkbox" />
                                    공지로 등록
                                </label>
                            </div>
                        </div>
                        <div className={style.file}>
                            <input type="file"></input>
                        </div>
                        <div className={style.contentwrite}>
                            툴바
                        </div>

                        <div className={style.list2}><button>목록으로</button></div>
                    </div>

                    <hr></hr>
                    <hr></hr>

                    {/* 댓글 */}
                    <div className={style.comment2}>
                        <div className={style.comment3}>댓글</div>
                        <div className={style.commentwrite}>
                            <div className={style.profile}>프로필 사진</div>
                            <div className={style.userwrite}>
                                <div className={style.nametime}>
                                    <div className={style.name3}>이름</div>
                                    <div className={style.writetime3}>작성시간</div>
                                </div>
                                <div className={style.content4}>댓글내용</div>
                            </div>
                        </div>
                        <div className={style.commentwrite2}>
                            <textarea placeholder="내용을 입력하세요"></textarea>
                            <button className={style.okbutton}>확인</button>
                        </div>
                    </div>


                    <hr></hr>
                    <hr></hr>

                    <div className={style.gasyclick}>
                        <div className={style.standardwrite10}>글쓰기</div>


                        <div className={style.titlewrite}>
                            <div className={style.title2}>작성자</div>
                            <div className={style.text2}>작성자 ID
                            </div>
                        </div>

                        <div className={style.titlewrite}>
                            <div className={style.title2}>제목</div>
                            <div className={style.text2}>제목내용</div>

                        </div>
                        <div className={style.file}>
                            <div className={style.text2}>📥 파일다운로드</div>
                        </div>
                        <div className={style.contentwrite}>
                            내용
                        </div>
                        <div className={style.good2}>
                            <button className={style.thumbsbutton}>
                                <div className={style.finger}>👍</div>
                                <div className={style.plus}>+n</div>
                            </button>
                        </div>
                        <div className={style.list3}><button>목록으로</button></div>
                    </div>

                   
                </table>




            </div>
        </div>







    );
};

export default Boardlist;