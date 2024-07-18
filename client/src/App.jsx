import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PickCarContainer from './searchService/searchComponent/PickCarContainer';
import CitySearchContainer from './searchService/searchComponent/CitySearchContainer';
function App() {

  return (
    <Router>         
          <Routes>
          <Route path='/' element={<PickCarContainer/>}  />
          <Route path='/search' element={<CitySearchContainer/>} />
          </Routes  >               
    </Router>
  )
}

export default App
