import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";


class Navbar extends Component {
  render() {
    return (
      <nav className="mainNav">
        <div className="container">
<<<<<<< HEAD
          <Link className="navbar-brand" to="/">
            CaptureMe
            </Link>
          <Link to="/register">
            Register
            </Link>
||||||| merged common ancestors
            <Link className="navbar-brand" to="/">
                CaptureMe
            </Link>
            <Link to="/register">
                Register
            </Link>
=======
            <a className="navbar-brand font-hover" href="/">
              <strong>CaptureMe</strong>
            </a>
            <span className="navbar-brand">|</span>
            <a className="navbar-brand font-hover" href="/#">
              <strong>Log Out</strong>
            </a>
>>>>>>> e9d9bdb7a3d681fdb19c5d3ec0145f705c108ad1
        </div>
      </nav>
    )
  }
}

export default Navbar