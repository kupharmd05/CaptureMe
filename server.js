const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const routes = require("./routes");


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/capturemecontactlist");


// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'Express backend is connected to React' })
// });























app.listen(PORT, () => console.log(`Listening on port ${PORT}`));