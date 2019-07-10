const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  itemName: String,
  image: String,
  imagePath: String,
  itemPoints: Number,
  itemEnergy: Number
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;