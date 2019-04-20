import React from "react";
import "./login.css";

var createLogin = React.createClass({
    render: function() {
      return (
  
        <div className="login-page">
          <h1>Sign Up</h1>
          <div className="form">
            <form className="login-form">
              <input type="text" placeholder="name" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="email address" />
              <button>create</button>
              <p className="message">Already registered? <a href="login.html"><strong>Sign In</strong></a></p>
            </form>
          </div>
        </div>
      );
    }
  });

  export default createLogin;