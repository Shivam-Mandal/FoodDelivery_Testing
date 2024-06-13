import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import Navbar from './components/Navbar'
import Add from './pages/Add'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from './pages/List';
import Orders from './pages/Orders';

function App() {
  const url = "http://localhost:3000"
  return (
    <>
      <div className="container mx-auto">
        <Router>
          <ToastContainer/>
          <Navbar />
          <Routes>
            <Route exact path="/add" element={<Add url={url}/>} />
            <Route exact path="/list" element={<List url={url} />} />
            <Route exact path="/orders" element={<Orders url={url} />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
