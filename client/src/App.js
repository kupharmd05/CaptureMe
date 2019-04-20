import React, { Component } from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import axios from 'axios';
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

    axios.post("/user/image",{
      data: blob
    }).then(function(response){
      console.log(response)
    }).catch(function(error){
      console.log(error)
    })
    
    // function dataURItoBlob(dataUri) {
    //   let byteString = atob(dataUri.split(',')[1]);
    //   let mimeString = dataUri.split(',')[0].split(':')[1].split(',')[0];

    //   let ab = new ArrayBuffer(byteString.length);
    //   let ia = new Uint8Array(ab);
    //   for (let i = 0; i < byteString.length; i++){
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   return new Blob([ab], {type: mimeString})
    // }
    // dataURItoBlob()
    console.log(blob)
  }

  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }



  render() {
    return (
      <div>
        <form class="capture-form">
          <button onClick={ () => {
          let facingMode = FACING_MODES.ENVIRONMENT;
          let idealResolution = { width: 640, height: 480 };
          this.startCamera(facingMode, idealResolution);
        }}> Start environment facingMode resolution ideal 640 by 480 </button>
        <br/><br/>
        <button onClick={ () => {
          let facingMode = FACING_MODES.USER;
          this.startCamera(facingMode, {});
        }}> Start user facingMode resolution default </button>
        <br/><br/>
        <button onClick={ () => {
          let facingMode = FACING_MODES.USER;
          this.startCameraMaxResolution(facingMode);
        }}> Start user facingMode resolution maximum </button>
        <br/><br/>
        <button onClick={ () => {
          this.takePhoto();
        }}> Take photo </button>
        <br/><br/>
        <button onClick={ () => {
          this.stopCamera();
        }}> Stop </button>
        </form>

        <video
          ref={this.videoRef}
          autoPlay="true"
        />
        <img
          alt="imgCamera"
          src={this.state.dataUri}
        />
      </div>
    );
  }
}

export default App;
