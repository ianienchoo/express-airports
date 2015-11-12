var mongoose = require('mongoose');

var terminal = new mongoose.Schema ({
  name: String,
  flights: [mongoose.Schema.Types.ObjectId],
  capacity: Number
})

var Terminal = mongoose.model('Terminal', terminal);

module.exports.model = Terminal;
module.exports.schema = terminal;
