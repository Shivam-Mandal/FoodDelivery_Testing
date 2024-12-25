import React, { useState, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import FoodState from './context/FoodState';
import Footer from './components/Footer';
import Aboutus from './Pages/Aboutus';
import LoginModal from './components/LoginModal';
import Cart from './components/Cart';
import PlaceOrder from './components/PlaceOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify';
import MyOrders from './Pages/MyOrders';
import GoToTopButton from './components/GoToTopButton';
import FoodContext from './context/FoodContext';

function App() {
    const [login, setLogin] = useState(false);

    return (
        <FoodState>
            <AppContent login={login} setLogin={setLogin} />
        </FoodState>
    );
}

const AppContent = ({ login, setLogin }) => {
    const { isDarkMode, toggleDarkMode, theme } = useContext(FoodContext);

    return (
        <div className={`app ${theme}`} style={{ fontFamily: "outfit" }}>
            <ToastContainer />
            <Router>
                {login ? <LoginModal setLogin={setLogin} /> : null}
                <Navbar setLogin={setLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/about' element={<Aboutus/>} />
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/placeOrder' element={<PlaceOrder />} />
                    <Route exact path='/verify' element={<Verify />} />
                    <Route exact path='/myorders' element={<MyOrders />} />
                </Routes>
                <Footer />
            </Router>
            <GoToTopButton />
        </div>
    );
}

export default App;
