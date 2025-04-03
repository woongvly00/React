import './Board_free.css';

const Board_free = () => {
    return (


        <div className="boardContainer">
            <div>
                사이드컬럼
            </div>
            <div className={style.subcontainer}>

                <table className="cotainer">
                    

                    <tr className="gaysipan">
                        <th>📝게시판</th>
                    </tr>
                    <tr className="navi">
                        <th>자유 게시판, 동아리 게시판</th>
                
                    </tr>
                    <hr></hr>
                    <tr className="list">
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                            <th></th>
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
                    {/* <tr className="navi2">
                        <th>자유게시판</th>
                    </tr>
                    <hr></hr>
                    <tr className="list">

                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                            <th>추천</th>
                        </tr>
                        <tr>
                            <td>글</td>
                            <td>글</td>
                            <td>글</td>
                            <td>글</td>
                            <td>글</td>
                            <td>👍+n</td>

                        </tr>
                        <tr>
                            <td>글</td>
                            <td>글</td>
                            <td>글</td>
                            <td>글</td>
                            <td>글</td>
                            <td>👍+n</td>
                        </tr>


                    </tr> */}
                </table>
            </div>
        </div>
       
                


    );
}
export default Board_free;