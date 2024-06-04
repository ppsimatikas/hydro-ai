import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src='logo.png' alt="logo" />
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Header;
