import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";


class Navbar extends Component {
  render() {
    return (
      <nav className="mainNav">
        <div className="container">
            <a className="navbar-brand font-hover" href="/">
              <strong>CaptureMe</strong>
            </a>
            <span className="navbar-brand">|</span>
            <a className="navbar-brand font-hover" href="/#">
              <strong>Log Out</strong>
            </a>
        </div>
      </nav>
    )
  }
}

export default Navbar