import React from 'react';
import style from './Home.module.css';
import Navigation from '../../Components/Navigation.jsx';
import Sidebar from '../../Components/Sidebar.jsx';
import MainContent from './MainContent.jsx';
import { useState } from 'react';

const Home = () => {
  const [isInputActive, setInputActive] = useState(false); // input 클릭 상태
  const [inputValue, setInputValue] = useState(""); // input 값 상태
  const [feeds, setFeeds] = useState([]);



  const handleFocus = () => {
    setInputActive(true);
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setInputActive(false);
    }
  };


  return (
    <div className={style.homeContainer}>
      <Navigation />
      <div className={style.homeContents}>
        <div className={style.homeSidebar}>
          <Sidebar />
        </div>
        <div className={style.homeMain}>

          <div className={style.homeCard}>
            <h2>뉴스피드</h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;