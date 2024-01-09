const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

var mongoose = require("mongoose");
// these two are for showing images in mongodb process:
var fs = require('fs');
var path = require('path');

//  body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
//  express.static to serve the public folder as a static directory
app.use(express.static("public"));

mongoose.Promise = Promise;
// set up for deploying on heroku and developing local
  if (process.env.DB_URI) {
    mongoose.connect(process.env.DB_URI);
  } else {
    mongoose.connect("mongodb://localhost:27017/littlecats", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false
    }, function(err){
      if(err){
      console.log("I am gettting an error", err);
    } else {
      console.log("mongoose connection is successful on: " + "mongodb://localhost:27017/littlecats");
    }
   });
  }

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11