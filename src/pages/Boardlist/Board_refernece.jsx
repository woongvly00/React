import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bstyle from './Board_reference.module.css';
import { useNavigate } from 'react-router-dom';

const Board_reference = () => {
    // const [group, setGroup] = useState([]);
    const navigate = useNavigate();

    const [sortOption, setSortOption] = useState("option1");
    const [searchQuery, setSearchQuery] = useState("");
    // const [filteredGroup, setFilteredGroup] = useState([]);

    //네비게이터
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [boardList, setBoardList] = useState([]);


    // 조회수 증가 후 페이지 이동
    const increaseViewCount = (post_id) => {
        axios.get(`http://10.5.5.12/board/increaseViewCount/${post_id}`)
            .then(response => {
                console.log('조회수 증가 성공:', response.data);
                navigate(`/mainpage/maincontent/titlelink/${post_id}`);
            })
            .catch(error => {
                console.error('조회수 증가 실패:', error);
            });
    };

    // 날짜 형식 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    //네비게이터 페이지 정보 보내는 부분
    useEffect(() => {
        axios.get(`http://10.5.5.12/board/navigator`, {
            params: { page: currentPage, size: 10 }
        })
            .then(res => {
                setBoardList(res.data.list);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => {
                console.error("페이지 데이터 로딩 실패:", err);
            });
    }, [currentPage]);

    const getFilteredAndSortedList = () => {
        const query = searchQuery.toLowerCase();
      
        const sorted = [...boardList].sort((a, b) => {
          if (sortOption === "option1") {
            return new Date(b.post_date) - new Date(a.post_date);
          } else if (sortOption === "option2") {
            return b.post_view - a.post_view;
          }
          return 0;
        });
      
        return sorted.filter(item =>
          item.post_title.toLowerCase().includes(query)
        );
      };

    return (
        <div className={bstyle.SBoardContainer}>
            <div className={bstyle.subcontainer}>
                <h2>📄 게시판</h2>
                <div className={bstyle.approval}>
                    <table className={bstyle.container}>
                        <thead>
                            <tr className={bstyle.navi}>
                                <th colSpan="6">자료실</th>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <div className={bstyle.boardgasyfound}>
                                        <input
                                            type="text"
                                            placeholder="🔍게시글 입력"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td colSpan="4">
                                    <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
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
                            {getFilteredAndSortedList().map((message, index) => (
                                <tr key={index}>
                                    <td>{message.post_id}</td>
                                    <td>
                                        <div
                                            onClick={() => increaseViewCount(message.post_id)}
                                            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                        >
                                            {message.post_title}
                                        </div>
                                    </td>
                                    <td>{message.post_writer}</td>
                                    <td>{formatDate(message.post_date)}</td>
                                    <td>{message.post_view}</td>
                                    <td>{message.post_like}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={bstyle.pagination}>
                        {/* 여기에 페이지 버튼 넣기 */}
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={currentPage === idx + 1 ? bstyle.active : ""}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                    <div className={bstyle.writeButton}>
                        <Link to="/mainpage/maincontent/write_button" state={{ name: "board" }}>
                            <button>작성하기</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board_reference;