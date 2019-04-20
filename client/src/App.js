import React, { Component } from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import './App.css';

class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ''
    };
    
  }

  state= {
    data: null
  };

  componentDidMount (){
    this.cameraPhoto = new CameraPhoto(this.videoRef.current)
    this.callBackendAPI().then(res => this.setState({ data: res.express})).catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !==200){
      throw Error(body.message)
    }
    return body;
  };

  startCamera(idealFacingMode, idealResolution) {
    this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
    .then(() => {
      console.log('Camera is started!')
    })
    .catch((err) => {
      console.error('Camera is not started', err)
    });
  }

  startCameraMaxResolution (idealFacingMode) {
    this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
      .then(() => {
        console.log('camera is started!');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }

  takePhoto () {
    const config = {
      sizeFactor: 1
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ dataUri });
    let blob = dataUri

    var base64Image = blob.replace("data:image/png;base64,", "");
    var imageReady = prepareToSend(base64Image);
    var key = "AIzaSyBO1-gzEojkiM6BU5uDjeDT4ndpvrFFCtA";
    sendImage(imageReady, key);
    
    function sendImage(data, key) {
      // console.log(data);

      return new Promise((resolve, reject) => {
        
          fetch("https://vision.googleapis.com/v1/images:annotate?key=" + key,{
             
              method: 'post',
              body: data,
              contentType: 'application/json',
              dataType: 'json'
           }).then(function(response){
                  response.json().then(function(data){
                    console.log(data);
                    var text=data.responses[0].fullTextAnnotation.text;

                    
                    var newLineText = text.split("\n");
                    console.log(newLineText);
                    printText(text);
                  })
           })
               .catch(function( error, response, body ){
                  console.log(error);
               })
      })
  };
  

  function prepareToSend(image) {
      var data = {
          requests: [
              {
                  image: {
                      content: image
                  },
                  features: [
                      {
                          type: "DOCUMENT_TEXT_DETECTION"
                      }
                  ]
              }
          ]
      }
      return JSON.stringify(data);
  }

  function printText(text){

        document.querySelector('.text').append(text + "\n");

  }


    // console.log(blob)
  }

  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stopped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }



  render() {
    return (
      <div className="capture-form">
          <button onClick={ () => {
          let facingMode = FACING_MODES.ENVIRONMENT;
          let idealResolution = { width: 270, height: 270 };
          this.startCamera(facingMode, idealResolution);
        }}> Start Camera</button>
        <br/><br/>
        <button onClick={ () => {
          this.takePhoto();
        }}>Take photo</button>
        <br/><br/>
        <button onClick={ () => {
          this.stopCamera();
        }}>Close Camera</button>
        <br/><br/>
        <video className="camera"
          ref={this.videoRef}
          autoPlay = {true}
        />
        <br/><br/>
        <img
          alt="imgCamera"
          src={this.state.dataUri}
        />
        <p className="text" />
      </div>
    );
  }
}

export default App;
