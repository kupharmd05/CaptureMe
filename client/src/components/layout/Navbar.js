import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import login from '../auth/login';



function Navbar (props) {
  
  
    return (
      <nav className="mainNav">
        <div className="container">
          <a className="navbar-brand font-hover" href="/">
            <strong>CaptureMe</strong>
          </a>
          <span className="navbar-brand">|</span>
          <button className="button"{...props}>{props.children}</button>
        </div>
      </nav>
    )
  }


export default Navbar