import React, { Component } from 'react';
import Dragula from "react-dragula";

import "../../utils/googleAPI";
import "./verify.css";



export class VerifyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: ["full name", "phone", "job title", "email", "fax"],
      
    }

    this.splitData = this.getInitialSplitData(this.props.data);
  }


  getInitialSplitData = (data) => {    
    console.log(data);
    
    return data.split("\n");
  
  }

dragulaDecorator = componentBackingInstance => {
  if (componentBackingInstance) {
  let options = {};
    const dragula = Dragula([componentBackingInstance], options);
    dragula.on('drop', (itemThatWasDragged, parent, someOtherThing, itemBelow) => {
      const updatedArray = [...parent.children].map((child) => child.children[0].value);
      this.splitData = updatedArray;
      // console.log();
      // const keyOfItemDragged = itemThatWasDragged.value;
      // const valueOfItemDragged = this.state.splitData[keyOfItemDragged];
      // console.log(keyOfItemDragged);
      // console.log(valueOfItemDragged);

      // const updatedArray = [...this.state.splitData].filter((data, index) => index !== keyOfItemDragged);
      // console.log(updatedArray);

      // if (itemBelow) {
      //   const newPosition = itemBelow.children[0].name - 1;
      //   console.log('updated array', updatedArray);
      //   // this.setState({ splitData: updatedArray });

      // }
      // // const positionOfItemBelow = this.state.splitData.findIndex(val => val === newPosition)
      // const position = positionOfItemBelow - 1;
      // console.log(newPosition, positionOfItemBelow, position, someOtherThing, parent);
      // const listWithoutItem = this.st
    })
  }
}


handleInputChange = event => {

  let updatedValue = event.target.value;
  const name = event.target.name;

  const updatedSplitData = this.splitData;
  updatedSplitData[name] = updatedValue

  this.setState({
    splitData: updatedSplitData
  });
};

handleCreateContact = (event) => {
  event.preventDefault();
  const returnedContact = this.splitData;
  console.log(returnedContact);

  fetch('/api/vcard',{
    method: 'POST',
    body: returnedContact,
    contentType: "application/json",
    dataType: "json"
    })
    .then(function(response){
      return response.json();
    })
    .then(function(myJson){
      console.log(JSON.stringify(myJson));
    });
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
            <ul className="print" ref={this.dragulaDecorator}>
              {this.splitData.map((item, index) => (
                
                <li>
                <input key={index} name={index} value={item} onChange={this.handleInputChange}/>

                </li>
              ))}
            </ul>
          </div>
        </div>
            <button onClick={this.handleCreateContact}>create contact</button>
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





  

