var mongoose = require('mongoose');
var terminalSchema = require('./terminal').schema

var airport = new mongoose.Schema ({
  name: String,
  country: String,
  terminals: [terminalSchema],
  opened: Date
})

var Airport = mongoose.model('Airport', airport);

module.exports.model = Airport;
module.exports.schema = airport;
