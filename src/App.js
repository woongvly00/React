import React from 'react';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import MainContent from './Components/MainContent';
import Sidebar from './Components/Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <Header />
        <Navigation />
        <div className="content-wrapper">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default App;
