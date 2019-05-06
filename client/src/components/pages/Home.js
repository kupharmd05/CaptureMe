import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import logo from '../pages/capturemefinal.png';
import "./Home.css";
// import Camera from "../camera/camera"
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
      <React.Fragment>
        <Navbar onClick={this.logout}>
          <Link to={'/'}><strong className="font-hover">Logout</strong></Link>

        </Navbar>
        <div className="container">
          <div className="jumbotron">
            <img src={logo} alt="Logo" />
            <Link to={'/camera'}><button>Camera</button></Link>
          </div>
        </div>

      </React.Fragment>

    ) : (
        <div>
          <Navbar onClick={this.login}>
            <Link to={'/'}><strong className="font-hover">Login</strong></Link>
          </Navbar>
          <div className="container">
            <div className="jumbotron" style={{ "background": "transparent" }}>
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </div>
      );


    return (
      <div>
        {mainContent}
      </div>

    );
  }
});