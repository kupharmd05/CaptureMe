import React, { Component } from 'react'
import "./login.css";



export class CreateLogin extends Component {

  state = {
    name: "",
    username: "",
    password: "",
    email: ""
  }

onChange = (e) => this.setState({[e.target.name]: e.target.value})


  render() {
    return (
      <div className="login-page">
      <h1>Sign Up</h1>
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="Full Name" name="name" onChange = {this.onChange}/>
          <input type="text" placeholder="User Name" name="username" onChange = {this.onChange}/>
          <input type="password" placeholder="Password" name="password" onChange = {this.onChange}/>
          <input type="text" placeholder="Email address" name="email" onChange = {this.onChange}/>
          <button>create</button>
          <p className="message">Already registered? <a href="login.html"><strong>Sign In</strong></a></p>
        </form>
      </div>
    </div>
    )
  }
}

export default CreateLogin







  