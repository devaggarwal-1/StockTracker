import { useState } from 'react'
import Register from './Register'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Home"
import Navbar from './components/Navbar'
import './styles/App.css'
import StockPage from './StockPage'
import Watchlist from './Watchlist'
import News from './News'

function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/stock/:s' element={<StockPage />}> </Route>
          <Route path='/watchlist' element={<Watchlist />}></Route>
          <Route path='/news' element={<News />} ></Route>
        </Routes>
      </div>
    </BrowserRouter >
  )
}

export default App
