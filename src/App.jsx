import "./App.css";
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

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header title="Zepeat X MoT" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
