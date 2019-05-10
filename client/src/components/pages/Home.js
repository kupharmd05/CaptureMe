import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import logo from './capturemelogo.png';
import "./Home.css";
import Navbar from '../layout/Navbar';



export default withAuth(class Home extends Component {
  state = { authenticated: null };

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async () => {
    this.props.auth.login('/');
  }

  logout = async () => {
    this.props.auth.logout('/');
  }

  render() {

    if (this.state.authenticated === null) return null;
    const mainContent = this.state.authenticated ? (
    <div>
      <React.Fragment>
        <Navbar onClick={this.logout}>
          <Link to={'/'}><strong className="font-hover">Logout</strong></Link>
        </Navbar>
      </React.Fragment>

      <React.Fragment>
        <div className="container">
          <div className="jumbotron">
            <p><img id="logoImg" src={logo} alt="logo"/></p>
            <Link to={'/camera'}><button>Camera</button></Link>
          </div>
        </div>
      </React.Fragment>
    </div>

    ) : (
      <React.Fragment>
        <div id="body-two">
          <Navbar onClick={this.login}>
              <Link to={'/'}><strong className="font-hover">Login</strong></Link>
          </Navbar>
          <div className="pitch fadeInDown animate">
            <h1>CaptureME</h1>
            <p>Transform business cards into mobile contacts</p>
          </div>
        </div>
        <footer>
          <p>&copy; Copyright 2019 | KU Bootcamp</p>
        </footer>
      </React.Fragment>
      );


    return (
        <div>
          {mainContent}
        </div>
    );
  }
});