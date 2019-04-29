import React, { Component } from 'react';
import  Verify from '../verify';
import sendImage from "../../utils/googleAPI";
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';


export class Camera extends Component {

    constructor (props, context) {
        super(props, context);
        this.cameraPhoto = null;
        this.videoRef = React.createRef();
        this.state = {
          dataUri: '',
        };
        

        console.log(this.state.dataUri);
      }
    
      state= {
        data: {},
        redirect: false
      };

      componentDidMount (){
        this.cameraPhoto = new CameraPhoto(this.videoRef.current)
        
      }
    
      
    
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
        sendImage(imageReady, key).then((data) => {
          this.setState({ data })
        });
        
    
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
    
    
        
      }
    
      stopCamera () {
        this.cameraPhoto.stopCamera()
          .then(() => {
            if(this.state.data.length !==0) {
              this.setState({ redirect: true });
            }
            else {
              alert("There is no data available");
            }
          })
          .catch((error) => {
            console.log('No camera to stop!:', error);
          });
      }

  render() {

    console.log('====================================');
    console.log(this.state.data);
    console.log('====================================');

    if (this.state.redirect) {
      return <Verify data={this.state.data} />
    }

    return (
        <div className="capture-form">
            <button onClick={() => {
                let facingMode = FACING_MODES.ENVIRONMENT;
                let idealResolution = { width: 640, height: 480 };
                this.startCamera(facingMode, idealResolution);
            }}> Start Camera</button>
            <br /><br />
            <button onClick={() => {
                this.takePhoto();
            }}>Take photo</button>
            <br /><br />

             {/* <a href="/verify"> */}
             <button onClick={() => {
                      this.stopCamera();
                  }}>Close Camera</button>
                  {/* </a> */}
            <br /><br />
            <video className="camera"
                ref={this.videoRef}
                autoPlay={true}
            />
            <br /><br />
            <img
                alt="imgCamera"
                src={this.state.dataUri}
            />

          <div className="container col" >
            <ul className="print" ref={this.dragulaDecorator}>
            </ul>
          </div>
        </div> 

        
    )
  }
}

export default Camera
