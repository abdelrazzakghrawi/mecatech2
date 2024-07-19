import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PickCarContainer from './searchService/searchComponent/PickCarContainer';
import CitySearchContainer from './searchService/searchComponent/CitySearchContainer';
import PresationContainer from './searchService/searchComponent/PresationContainer';
import SearchBar from './searchService/searchComponent/SearchBar';
function App() {

  return (
    <Router>         
          <Routes>
          <Route path='/' element={<SearchBar/>}  />
          </Routes  >               
    </Router>
  )
}

export default App
