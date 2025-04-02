import React from 'react';
import style from '../MainPage/Mainpage.module.css';
import Header from '../../Components/Header.jsx';
import Home from './Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './MainContent.jsx';

const Mainpage = () => {


  return (
    <div className={style.container}>
        <div className={style.header}>
            <Header />
        </div>
        <div className={style.contents}>
        <Routes>
          <Route path="" element={<Home/>}></Route>
          <Route path="" element={<MainContent/>}></Route>
        </Routes>
        </div>
    </div>
  );
};

export default Mainpage;