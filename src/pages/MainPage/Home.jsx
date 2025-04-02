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
        </div>
        <div className={style.contents}>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <div>
            <div>공지</div>
            <div>게시판</div>
            <div>뉴스피드</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;