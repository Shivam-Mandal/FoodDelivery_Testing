import React,{useState} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import FoodState from './context/FoodState'
// import Menu from './Pages/Menu'
import Footer from './components/Footer'
import Aboutus from './Pages/Aboutus'
import LoginModal from './components/LoginModal'
import Cart from './components/Cart'
import PlaceOrder from './components/PlaceOrder'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify'
import MyOrders from './Pages/MyOrders'
import GoToTopButton from './components/GoToTopButton'
import Demo from './components/Demo'

function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className='' style={{ fontFamily: "outfit" }}>
      <FoodState>
        <ToastContainer/>
        {/* <Demo/> */}
        <Router>
          {login?<LoginModal setLogin={setLogin}/>:<></>}
          <Navbar  setLogin={setLogin}/>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<Aboutus/>} />
            <Route exact path='/cart' element={<Cart/>} />
            <Route exact path='/placeOrder' element={<PlaceOrder/>} />
            <Route exact path='/verify' element={<Verify/>}/>
            <Route exact path='/myorders' element={<MyOrders/>}/>
          </Routes>
          <Footer />
        </Router>
        <GoToTopButton/>
      </FoodState>
    </div>
  )
}

export default App
