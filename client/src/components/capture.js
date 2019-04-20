import React from "react";
import "./camera.css";


var capture = React.createClass({
  render: function () {
    return (

      <div className="capture-page">
        <h1>CaptureMe</h1>
        <div className="form">
          <form className="login-form">
            <h2>Welcome John Doe!</h2>
            <br />
            <h4>Take a picture of a business card or upload one</h4>
            <br />
            <button type="submit" className="capture-picture" formAction="../src/camera.html">Capture</button>
          </form>
          <br />
          <button type="button" className="upload-button">Upload Image</button>
        </div>
      </div>
    );
  }
});

export default capture;