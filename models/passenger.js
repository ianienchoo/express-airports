var mongoose = require('mongoose');

var passenger = new mongoose.Schema ({
  firstName: String,
  lastName: String,
  dob: Date
})

var Passenger = mongoose.model('Passenger', passenger);

module.exports.model = Passenger;
module.exports.schema = passenger;
