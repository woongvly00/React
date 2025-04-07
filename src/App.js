import React, { useEffect } from 'react';
import Index from './pages/Index/Index';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuthStore from '../src/store/useAuthStore';
import RouteFilter from './Components/filters/RouteFilter';
import Mainpage from './pages/MainPage/Mainpage.jsx';
import MessengerPopupContainer from "./Messages/MessengerPopupContainer";
import Header from './Components/Header.jsx';


const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    
      <div className="app-container">
       
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route element={<RouteFilter/>}>
            <Route path='/mainpage/*' element={<Mainpage/>}></Route>
            <Route path='/messenger/*' element={<MessengerPopupContainer />} />
            <Route path='/home/*' element={<Header/>}/>
          {/* </Route> */}

          </Route>

        </Routes>
    
      </div>
  );
};

export default App;