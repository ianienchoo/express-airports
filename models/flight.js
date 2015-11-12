var mongoose = require('mongoose');

var flight = new mongoose.Schema ({
  from: String,
  to: String,
  airline: String,
  passengers: [mongoose.Schema.Types.ObjectId]
})

var Flight = mongoose.model('Flight', flight);

module.exports.model = Flight;
module.exports.schema = flight;
