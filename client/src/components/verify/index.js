import React, { Component } from 'react';
import Dragula from "react-dragula";

import "../../utils/googleAPI";
import "./verify.css";



export class VerifyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      labels: ["full name", "phone", "job title", "email", "fax"],
      
=======
      labels: ["full name", "phone", "job title", "email"],
      splitData: this.getInitialSplitData(this.props.data)
>>>>>>> 0b3956ed31b649438e78a8fe485b70868132be16
    }

    
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
      console.log(this.splitData);
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
  console.log(name);
  console.log(this.splitData);
  console.log(updatedValue);
  let updatedSplitData = this.state.splitData;
  console.log(updatedSplitData)
  updatedSplitData[name] = updatedValue;
  this.setState({
    splitData: updatedSplitData
  });
  
};

handleCreateContact = async (event) => {
  event.preventDefault();
  const returnedContact = this.state.splitData;
  console.log(returnedContact);

  const response = await fetch('/api/vcard',{
    method: 'POST',

    headers: {
    "Content-Type": 'application/json',
    },  
    body: JSON.stringify({ data: this.state.splitData }),
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
              {this.state.splitData.map((item, index) => (
                
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
