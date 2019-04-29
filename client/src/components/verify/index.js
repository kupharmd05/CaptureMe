import React, { Component } from 'react';
import Dragula from "react-dragula";
import "../../utils/googleAPI";
import "./verify.css";


export class VerifyInfo extends Component {


  state = {
    labels: ["full name", "phone", "job title", "email", "fax"],
  }

dragulaDecorator = componentBackingInstance => {
  if (componentBackingInstance) {
  let options = {};
  Dragula([componentBackingInstance], options);
  }
}


handleInputChange = event => {

  let value = event.target.value;
  const name = event.target.name;

  console.log(value);
  console.log(name);

  this.setState({
    value: this.props.value
  });
};

  render() {
    
const data = this.props.data;
console.log(data);
let splitData = {...data.split("\n")};


  
    console.log(splitData);
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
            <ul className="print" ref={this.dragulaDecorator}>
              {Object.keys(splitData).map((key, item) =>(
                
                <li>
                  <input key={item} name={item} defaultValue={splitData[key]} onChange={this.handleInputChange}/>
                </li>
              ))}
            </ul>
          </div>
        </div>
            <button>create contact</button>
            <br /><br />
            <button type="submit" formAction="/camera">retake</button>
          </form>
          <br />
          <form>
            <button type="submit" formAction="/home">cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

export default VerifyInfo





  

