import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
