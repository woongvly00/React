import React from 'react';
import './App.css';
import Mainpage from './pages/MainPage/Mainpage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {


  return (
    <div className="app-container">
        <Routes>
          {/* <Route path="/mainpage" element={<Index />}></Route> path / 로 수정하고 아래 path 에 mainpage 넣어야함*/}
          <Route path="/" element={<Mainpage/>}></Route>
        </Routes>
    </div>
  );
};

export default App;
