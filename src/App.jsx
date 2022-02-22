import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import BrandOffers from "./components/BrandOffers/BrandOffers";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Loyalty from "./components/Loyalty/Loyalty";
import Navbar from "./components/Navbar/Navbar";
import TabButton from "./components/TabButton/TabButton";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import PhoneAuth from "./components/PhoneAuth/PhoneAuth";
import { UserContext } from "./contexts/UserContext"


function App() {
  const [showPhoneAuth, setShowPhoneAuth] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // localStorage.removeItem("localStorageUserId");
    console.log(localStorage.getItem("localStorageUserId"));
    if (localStorage.getItem("localStorageUserId") != null) {
      console.log("inside if of localStorage")
      // setShowPhoneAuth(false);
    }else {
      // setShowPhoneAuth(true); 
    }
  
    console.log("from App userId state :",userId);
    console.log("userId useState :", userId)
    
    
  }, [])
  
  const getUserId = (value)=>{
    setUserId(value);
  }

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={userId}>
          <Navbar />
          <Header title="Zepeat X MoT" />
          <Routes>
            <Route path="/" element={<Home authOpen={true}/>} />
            <Route path="/cart" element={<Checkout />} />
          </Routes>
          <PhoneAuth open={showPhoneAuth} getUserId={getUserId}/>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
