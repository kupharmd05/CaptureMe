import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./login.css";

export class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})



  render() {
    return (
      <div className="login-page" style={{height: '100vh'}}>
          <div role="heading">
            <h1>Log In</h1>
          </div>
          <div className="form" role="form">
            <form className="login-form">
              <input type="text" placeholder="Username" name="username" onChange={this.onChange}/>
              <input type="text" placeholder="Password" name="password" onChange={this.onChange} />
              <button>Login</button>
              <p className="message">Not registered? <Link to="/create"/><strong>Sign Up</strong></p>
            </form>
          </div>
        </div>
    )
  }
}

export default Login









  