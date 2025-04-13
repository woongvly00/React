import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import useAuthStore from '../src/store/useAuthStore';
import RouteFilter from './Components/filters/RouteFilter';
import Index from './pages/Index/Index';
import Mainpage from './pages/MainPage/Mainpage';
import MessengerPopupContainer from './Messages/MessengerPopupContainer';
import Header from './Components/Header';
import Modal from 'react-modal';
import './axios/axiosConfig';

Modal.setAppElement('#root');

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    initialize();
  }, []);

  if (!isInitialized) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="message">잠시만 기다려주세요...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Index />} />

        {/* <Route element={<RouteFilter />}> */}
          <Route path='/mainpage/*' element={<Mainpage />} />
          <Route path='/messenger/*' element={<MessengerPopupContainer />} />
          <Route path='/home/*' element={<Header />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
};

export default App;
