const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');
const vision = require('@google-cloud/vision');
const axios = require('axios');
const path = require('path');
const router = express.Router();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));


app.use(express.static(__dirname + "/public"));

// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/login.html'))
// })




// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/public/login.html");
// })


app.get('/express_backend', (req, res) => {
  res.send({ express: 'Express backend is connected to React' })
});

// require("./Routes/htmlRoutes")(app);





















app.listen(PORT, () => console.log(`Listening on port ${PORT}`));