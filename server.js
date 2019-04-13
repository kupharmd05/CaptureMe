const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');
const vision = require('@google-cloud/vision');
const axios = require('axios')

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));



app.use(express.static('public'));



app.get('/express_backend', (req, res) =>{
    res.send({express: 'Express backend is connected to React'})
});

app.post("/user/image", function (req, res) {
    

    let base64Image = req.body;
    console.log(base64Image);

    // let base64Image = base64String.split(';base64,').pop();
    // console.log(base64Image);

    fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err){
        console.log('File created')
    })

    

 

    
});
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./client/src/APIkey.json"
    });
  
    // Performs label detection on the image file
    client
      .textDetection("image.png")
      .then(results => {
        console.log(results[0].fullTextAnnotation.text);
  
      })
      .catch(err => {
        console.error(err);
      });
  



















app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));