const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const fileInput = document.getElementById('file-input');
const context = canvas.getContext('2d');
const video = document.querySelector('video');

var constraints = {
    audio: false,
    video: {
        width: {min: 640, ideal: 1280, max: 1920},
        height: {min: 480, ideal: 720, max:1080},
        facingMode: "environment" //Defualt direction of the camera for mobile devices.
    }
};

// ================================================
//                                  FUNCTIONS
// ================================================




// Media Devices
navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        var videoTracks = stream.getVideoTracks();
        video.srcObject = stream;

              // Attach the video stream to the video element and autoplay.
      navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
          player.srcObject = stream;
      });



        video.addEventListener('loadeddata', function() {
            if (video.readyState >= 2) {

                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;

                let timerId;
                function draw() {
                    var context = canvas.getContext("2d");
                    context.drawImage(video, 0, 0);
                    timerId = setTimeout(draw, 20);
                }

                draw();

                document.querySelector("#capture").addEventListener("click", function (event) {                    
                    clearTimeout(timerId);
                    
                    var base64Image2 = canvas.toDataURL();
                    
                    bcr.recognizeBcr(base64image2, displayResultCallback, displayProgressCallback);
                    console.log(displayResultCallback);


                    var base64Image = canvas.toDataURL().replace("data:image/png;base64,", "");
                    var imageReady = prepareToSend(base64Image);
                    var key = "AIzaSyBO1-gzEojkiM6BU5uDjeDT4ndpvrFFCtA";
                    sendImage(imageReady, key);
                });

            }
        })
    })
    .catch(function (err) {
        console.log(err.name + ": " + err.message);
    });

    function sendImage(data, key) {
        console.log(data);

        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "https://vision.googleapis.com/v1/images:annotate?key=" + key,
                data: data,
                contentType: 'application/json',
                dataType: 'json'
             }).done(function(data){
                    console.log(data);
                    var text=data.responses[0].fullTextAnnotation.text;
                    var newLineText = text.split(",");
                    printText(newLineText); // Colorado
                    // AJAX Request to /api/image./?q=Colorado

                    $.post("/api/card", function(data) {
                        console.log(data);
                        console.log(text);
                    })
                    resolve();
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
        $( "#textOfImage" ).append( `<p>${text}</p>` );
    }