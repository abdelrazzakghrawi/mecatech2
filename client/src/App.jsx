import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './searchService/searchComponent/PickCarContainer';
import PickCarContainer from './searchService/searchComponent/PickCarContainer';
function App() {

  return (
    <Router>         
          <Routes>
          <Route path='/' element={<PickCarContainer/>} />
          </Routes>               
    </Router>
  )
}

export default App
