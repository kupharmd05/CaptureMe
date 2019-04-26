import React, { Component } from 'react';
import Dragula from "react-dragula";
import "../login/login.css";

export class VerifyInfo extends Component {

dragulaDecorator = componentBackingInstance => {
  if (componentBackingInstance) {
  let options = {};
  Dragula([componentBackingInstance], options);
  }
}

state= {
labels: ["full name", "phone", "job title", "email", "fax"]
};

  render() {
    return (
      <div className="login-page">
        <h1>Verify Info</h1>
        <div className="form">
          <form className="login-form">
          <div className="row">
          <div className="container col">
            <ul>
              {this.state.labels.map(label => (
                <li class="label">{label}</li>
              ))}
            </ul>
          </div>

          <div className="container col" >
            <ul class="print" ref={this.dragulaDecorator}>
            </ul>
          </div>
        </div>
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
    )
  }
}

export default VerifyInfo





  

