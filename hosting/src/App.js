import React, { useState } from 'react';
import './App.scss';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import NoMatch from './pages/NoMatch.js';
import { Routes, Route, Outlet } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className="layout">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
