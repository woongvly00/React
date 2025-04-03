import './BoardMain.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';




const BoardMain = () => {


    return (



        <div className="SBoardContainer">
        <div>
          ur li 쓰세요
        </div>
        <div className="subcontainer">
  
  
  
          <h2>📄 예약</h2>
          <div className="approval-grid"></div>
      
          <table className="cotainer">



            <tr className="navi">
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


            <div className="navi">
                <th>자유 게시판, 동아리 게시판</th>

            </div>
            <div className="navibelow">
                <div className="navibelowleft"><input type="text" placeholder="🔍게시글 입력"></input></div>
                <div className="navibelowright">
                    <select>
                        <option value="option1">최신순</option>
                        <option value="option2">조회순</option>
                        <option value="option3">추천순</option>
                    </select>
                </div>
            </div>
            <hr></hr>
            <div className="freelist">

                <div className="photo">

                    사진
                </div>
                <div className="write">
                    <div className="title">제목</div>
                    <div className="content">내용</div>
                    <div className="writeElse">
                        <div className="writer">작성자</div>
                        <div className="good">추천수</div>
                        <div className="look">조회수</div>
                        <div className="writeTime">현재 시간</div>
                    </div>
                </div>

            </div>

            {/* 스탠다드 게시판 글쓰기 작성 */}
            <div className="container2">
                <div className="signcancel">
                    <button>등록</button>
                    <button>취소</button>
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
                    <div className="text2"><input type="text" placeholder="제목을 입력하세요"></input></div>
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
                <div className="contentwrite">
                    툴바
                </div>
                <div className="good2">
                    <button className="thumbs-button">
                    <div className="finger">👍</div>
                    <div className="plus">+n</div>
                    </button>
                </div>
                <div className="list2"><button>목록으로</button></div>
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
                    <input type="text" placeholder="내용을 입력하세요"></input>
                <button>확인</button>
                </div>
            </div>

            </table>
  
  
  
  
        </div>
      </div>


       




    );
};

export default BoardMain;