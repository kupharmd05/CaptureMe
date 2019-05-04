import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import logo from './capturemefinal.png';
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
        <div>
          <React.Fragment>
            <Navbar onClick = {this.logout}>
              <p>Logout</p>
            </Navbar>
            <Link to={'/camera'} className="btn btn-warning">Camera</Link>
            
          </React.Fragment>
       
            {/* <button className="btn btn-dark btn-lg" onClick={this.logout}>Logout</button> */}
        </div>
    ) : (
        <div>
            <Navbar onClick = {this.login}>
              <p>Login</p>
            </Navbar>
            {/* <button className="button" onClick={this.login}>Login</button> */}
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