import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessengerPopup from "./MessengerPopup/MessengerPopup";

const MessengerPopupContainer = () => {
    console.log("MessengerPopupContainer 렌더링됨");
  return <MessengerPopup />;
     
   
  
};

export default MessengerPopupContainer;