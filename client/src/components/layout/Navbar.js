import React from 'react';

import "./navbar.css";



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