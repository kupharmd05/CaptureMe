import React from 'react';
import logo from "../pages/capturemelogo.png";
import "./navbar.css";



function Navbar(props) {


  return (
    <nav className="mainNav">
      <img id="navImg" src={logo} alt="navigation"/>
      <span className="" {...props}>{props.children}</span>
    </nav>

  )
}


export default Navbar