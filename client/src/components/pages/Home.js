import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import logo from './capturemefinal.png';
import "./Home.css";

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
        {/* <Redirect to={{ pathname: '/camera' }}/>  */}
        <button className="btn btn-dark btn-lg" onClick={this.logout}>Logout</button>
      </div>
    ) : (
        <div>
          {/* <p className="">Please Log In</p> */}
          <button className="button" onClick={this.login}>Login</button>
        </div>
      );


    return (
      <div className="jumbotron">
        <img src={logo} alt="Logo" />
        {mainContent}
      </div>
    );
  }
});