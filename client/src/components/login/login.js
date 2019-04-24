import React from "react";
import "./login.css";

var login = React.createClass({
    render: function() {
      return (
  
        <div className="login-page" style={{height: '100vh'}}>
          <div role="heading">
            <h1>Log In</h1>
          </div>
          <div className="form" role="form">
            <form className="login-form">
              <input type="text" placeholder="username" />
              <input type="text" placeholder="password" />
              <button>login</button>
              <p className="message">Not registered? <a href="create-login.html"><strong>Sign Up</strong></a></p>
            </form>
          </div>
        </div>
      );
    }
  });

  export default login;