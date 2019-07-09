const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  avatar: {
    type:String,
    required:true,
    enum: ['avatONE', 'avatTWO', 'avatTHREE', 'avatFOUR', 'avatFIVE','upload IMG'],
    default: 'avatONE'
  },
  avatarPath: {type: String, default: '/images/srirachi.png'},
  pointsGlobal: {type: Number, default: 0},
  pointsMatch: {type: Number, default: 0},
  energyMatch: {type: Number, default: 100}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
