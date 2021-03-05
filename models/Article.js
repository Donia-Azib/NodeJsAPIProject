const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String},
  userId: { type: String},
  username: { type: String },
  publish :{type:Boolean}
  // price: { type: Number },
});

module.exports = mongoose.model('Article', thingSchema);