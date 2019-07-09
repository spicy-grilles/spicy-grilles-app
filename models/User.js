const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  avatar: {
    type:String,
    required:true,
    enum: ['avatONE', 'avatTWO', 'avatTHREE', 'avatFOUR', 'avatFIVE','upload IMG']
  },
  avatarPath: String,
  pointsGlobal: {type: Number, default: 0},
  pointsMatch: {type: Number, default: 0},
  energyMatch: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
