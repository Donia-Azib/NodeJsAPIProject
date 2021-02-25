const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  publish :{type:Boolean,required:true}
  // price: { type: Number },
});

module.exports = mongoose.model('Article', thingSchema);