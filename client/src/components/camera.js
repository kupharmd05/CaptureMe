import React from "react";
import "./camera.css";


var camera = React.createClass({
  render: function () {
    return (

      <div className="camera-page">
        <h1>Camera</h1>
        <div className="form">
          <form className="login-form">
            <br />
            <h4>Go ahead and capture your image!</h4>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <button type="button" className="take-picture">Take Picture
                  </button></form></div>
      </div>
    );
  }
});

export default camera;