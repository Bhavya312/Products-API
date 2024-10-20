const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:[true, 'Please provide username'],
    minlength:3,
    maxlength:[50, 'Username can not be more than 50 characters'],
    unique: true,
  },
  email:{
    type:String,
    required:[true, 'Please provide email'],
    minlength:3,
    maxlength:50,
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
    unique: true,
  },

  password:{
    type:String,
    required:[true, 'Please provide password']
  }
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
});

userSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id,name:this.name}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

module.exports = mongoose.model('User', userSchema);