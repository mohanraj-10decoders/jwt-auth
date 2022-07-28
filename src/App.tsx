import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Content from './Components/Content';
import Register from './Components/Register';
import Login from './Components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<Register />} />
          <Route path='/home' element={<Content />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
