import React, { Component } from 'react';
import Dragula from "react-dragula";
import "../../utils/googleAPI";
import "./verify.css";


export class VerifyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: ["full name", "phone", "  job title", "email"],
      splitData: this.getInitialSplitData(this.props.data),
      updatedArray: []
    }

    
  }


  getInitialSplitData = (data) => {    
    console.log(data);
    
    return data.split("\n");
  
  }

dragulaDecorator = async componentBackingInstance => {
  if (componentBackingInstance) {
  let options = {};
    const dragula = Dragula([componentBackingInstance], options);
    await dragula.on('drop', (itemThatWasDragged, parent, someOtherThing, itemBelow) => {
      const updatedArray = [...parent.children].map((child) => child.children[0].value);
      this.setState({
        updatedArray: updatedArray
      })

      



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
  let updatedSplitData = this.state.splitData;
  updatedSplitData[name] = updatedValue;
  this.setState({
    splitData: updatedSplitData
  });
  console.log(this.state.splitData);
};

handleCreateContact = async (event) => {
  event.preventDefault();
  const returnedContact = this.state.updatedArray;
  console.log(this.state.updatedArray);

  const response = await fetch('/api/vcard',{
    method: 'POST',
    headers: {
    "Content-Type": 'application/json',
    },  
    body: JSON.stringify({ data: returnedContact }),
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
              {this.state.labels.map((label, index) => (
                <li key={index} className="label">{label}</li>
              ))}
            </ul>
          </div>

          <div className="container col" >
            <ul className="print" ref={this.dragulaDecorator}>
              {this.state.splitData.map((item, index) => (
                
                <li>
                <input key={index} name={index} value={item} onChange={this.handleInputChange}/>
                <span className="drag" aria-disabled="true">::</span>
                <button className="delete btn btn-danger" onClick={(event) => {
                  event.preventDefault();
                  console.log(event.target)
                    var newItems = this.state.splitData.filter((_item) => {
                      return _item !== item;
                    });
                  
                    this.setState({splitData: newItems });
                  }
                }>X</button>
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
            <button type="submit" formAction="/">cancel</button>
          </form>
        </div>
      </div>
    )
    
    
  }
  
}

export default VerifyInfo
