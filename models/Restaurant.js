const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const restSchema = new Schema({
  username: String,
  url: String,
  image: String,
  imagePath: String,
  spicyPoints: {type: Number, enum: [1, 2, 3, 4, 5]},
  item: {type: String, default: null}, //pendiente
  location: { type: { type: String }, coordinates: [Number] }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Rest = mongoose.model('Rest', restSchema);
module.exports = Rest;
