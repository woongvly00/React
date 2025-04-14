// ✅ Mainpage.jsx
import React from 'react';
import Mainstyle from '../MainPage/Mainpage.module.css';
import Header from '../../Components/Header';
import Home from './Home';
import MainContent from './MainContent';
import { Outlet, Routes, Route } from 'react-router-dom';

const Mainpage = () => {
  return (
    <div className={Mainstyle.container}>
      <Header />
      <div className={Mainstyle.mainpageContents}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='maincontent/*' element={<MainContent />} />
        </Routes>
      </div>
    </div>
  );
};

export default Mainpage;