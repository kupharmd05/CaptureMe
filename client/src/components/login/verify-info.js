import React from "react";
import "./login.css";

var verifyInfo = React.createClass({
    render: function() {
      return (
  
        <div className="login-page">
          <h1>Verify Info</h1>
          <div className="form">
            <form className="login-form">
              <input type="text" placeholder="first name" />
              <input type="text" placeholder="last name" />
              <input type="text" placeholder="company" />
              <input type="text" placeholder="number" />
              <input type="text" placeholder="email" />
              <button>create contact</button>
              <br /><br />
              <button type="submit" formAction="../src/camera.html">retake</button>
            </form>
            <br />
            <form>
              <button type="submit" formAction="../src/capture.html">cancel</button>
            </form>
          </div>
        </div>
      );
    }
  });

  export default verifyInfo;