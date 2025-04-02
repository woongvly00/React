import React from 'react';
import style from './Home.module.css';
import Navigation from '../../Components/Navigation.jsx';
import Sidebar from '../../Components/Sidebar.jsx';
import MainContent from './MainContent.jsx';

const Home = () => {


    return (
      <div className={style.container}>
        <div>
            <Navigation />
            <Sidebar />
        </div>
        <div>
            <div>공지사항 최신글</div>
            <div>자유게시판 최신글</div>
            <div>뉴스피드</div>
        </div>
      </div>
    );
  };
  
  export default Home;