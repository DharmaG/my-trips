const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  date: {
    type: Number
  }
});

const TripModel = mongoose.model('Trip', tripSchema);

module.exports = TripModel;
