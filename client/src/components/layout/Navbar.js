import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import login from '../auth/login';
import logo from '../pages/capturemefinal.png';


function Navbar(props) {


  return (
    <nav className="mainNav">
      <div>
        <a className="navbar-brand font-hover" href="/">
          <strong>CaptureMe</strong>
        </a>
        <span className="navbar-brand">|</span>
        <span className="navbar-brand" {...props}>{props.children}</span>
      </div>
    </nav>

  )
}


export default Navbar