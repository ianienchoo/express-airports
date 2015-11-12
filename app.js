// require
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Airport = require('./models/airport').model;
var Terminal = require('./models/terminal').model;
var Flight = require('./models/flight').model;
var Passenger = require('./models/passenger').model;

// app
var app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose
mongoose.connect('mongodb://localhost/airports')

// create flight 1
var flight1 = new Flight({
  from: "CDG France",
  to: "JFK New-York",
  airline: "American Airlines",
  passengers: []
});

// 1st async call: save flight 1 in mongo
flight1.save(function(err) {
  console.log("Saved flight1!");
  // create flight 2
  var flight2 = new Flight({
    from: "Heathrow UK",
    to: "JFK New-York",
    airline: "Britsh Airways",
    passengers: []
  });
  // 2nd async call: save flight 2 in mongo
  flight2.save(function(err){
    console.log("Save flight2!");
    // create terminal with no flights
    var terminal1 = new Terminal({
      name: "Terminal 1",
      flights: [],
      capacity: 234324
    });
    // third async call: retrieve Object_ID of flight 1
    Flight.findOne({"airline": "American Airlines"}, function(err, flight) {
      // push flight1 ID into terminal1
      terminal1.flights.push(flight["_id"]);
      // 4th async call: retriev object_id of flight 2
      Flight.findOne({"airline": "Britsh Airways"}, function(err, flight) {
        // push flight 2 id into terminal1
        terminal1.flights.push(flight["_id"]);
        // create airport1 AND embed terminal1 in it
        var airport1 = new Airport({
          name: "JFK",
          country: "USA",
          terminals: [terminal1],
          opened: new Date("1990")
        });
        // 5th async call: save airport1 with embedded terminal1
        airport1.save(function(err) {
          console.log("airport1 saved: " + airport1.toString());
        });
      });
    });
  });
});

// SHOULD USE PROMISES!!!!

// start
app.listen(3000)
console.log("server started")
