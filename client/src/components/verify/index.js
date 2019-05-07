import React, { Component } from 'react';
import Dragula from 'react-dragula';
import '../../utils/googleAPI';
import './verify.css';


export class VerifyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: ['full name', 'phone', 'job title', 'email'],
      splitData: this.getInitialSplitData(this.props.data),
      updatedArray: this.getInitialSplitData(this.props.data),
      vcardUrl: undefined,
    };
  }


  getInitialSplitData = (data) => {
    console.log(data);

    return data.split('\n');

  };

  dragulaDecorator = async componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {};
      const dragula = Dragula([componentBackingInstance], options);
      await dragula.on('drop', (itemThatWasDragged, parent, someOtherThing, itemBelow) => {
        const updatedArray = [...parent.children].map((child) => child.children[0].value);
        this.setState({
          updatedArray: updatedArray,
        }, () => console.log(this.state.updatedArray));


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
      });
    }
  };


  handleInputChange = event => {
    let updatedValue = event.target.value;
    const name = event.target.name;
    let updatedSplitData = this.state.splitData;
    updatedSplitData[name] = updatedValue;
    this.setState({
      splitData: updatedSplitData
    }, () => console.log(this.state.splitData));
    console.log(this.state.splitData);
  };

  handleCreateContact = async (event) => {
    event.preventDefault();
    const returnedContact = this.state.updatedArray;
    console.log(this.state.updatedArray);

    fetch('/api/vcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: returnedContact }),
    }).then((response) => response.body.getReader())
      // Below code from MDN - Using Readable Streams
      // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
      .then((reader) => {
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then((url) => {
        this.setState({ vcardUrl: url });
      });
  };

  render() {
    console.log(this.state.splitData, this.state.updatedArray);

    return (

      <div className="login-page">

        <h1>Verify Info</h1>
        <div className="form">
          <form className="login-form">
            <div className="row">
              <div>
                <ul className="labels">
                  {this.state.labels.map((label, index) => (
                    <li key={index} className="label">{label}</li>
                  ))}
                </ul>
              </div>

              <div className="row">
                <ul className="print" ref={this.dragulaDecorator}>
                  {this.state.splitData.map((item, index) => (

                    <li className="draggedItems">
                      <input key={index} name={index} value={item}
                             onChange={this.handleInputChange} />
                      <span className="drag" aria-disabled="true">::</span>
                      <button className="delete btn btn-danger" onClick={(event) => {
                        event.preventDefault();
                        console.log(event.target);
                        var newItems = this.state.splitData.filter((_item) => {
                          return _item !== item;
                        });

                        this.setState({ splitData: newItems }, () => console.log(this.state.splitData));
                      }
                      }>X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button onClick={this.handleCreateContact}>create contact</button>
            {this.state.vcardUrl &&
              <button><a href={this.state.vcardUrl} download="contact.vcf">Download vCard</a></button>
            }
            <br /><br />
            <button type="submit" formAction="/camera">retake</button>
          </form>
          <br />
          <form>
            <button type="submit" formAction="/">cancel</button>
          </form>
          
        </div>
      </div>
    );
  }
}

export default VerifyInfo;
