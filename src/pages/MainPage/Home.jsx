import React from 'react';
import style from './Home.module.css';
import Navigation from '../../Components/Navigation.jsx';
import Sidebar from '../../Components/Sidebar.jsx';


const Home = () => {

    return (
      <div className={style.homeContainer}>
        <Navigation />
        <div className={style.homeContents}>
          <div className={style.homeSidebar}>
            <Sidebar/>
          </div>
          <div className={style.homeMain}>
          <div className={style.cardContainer}>
          <div className={style.homeCard}>
            <h2>공지  사항</h2>
            <p>최신 공지사항이 여기에 표시됩니다.</p>
          </div>
          <div className={style.homeCard}>
            <h2>게시판</h2>
            <p>부서별 글을 한 눈에 확인하세요.</p>
          </div>
          </div>
          <div className={style.homeCard}>
            <h2>뉴스피드</h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;