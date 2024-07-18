import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PickCarContainer from './searchService/searchComponent/PickCarContainer';
import CitySearchContainer from './searchService/searchComponent/CitySearchContainer';
import PresationContainer from './searchService/searchComponent/PresationContainer';
function App() {

  return (
    <Router>         
          <Routes>
          <Route path='/' element={<PickCarContainer/>}  />
          <Route path='/search' element={<CitySearchContainer/>} />
          <Route path='/prestation' element={<PresationContainer/>}/>
          </Routes  >               
    </Router>
  )
}

export default App
