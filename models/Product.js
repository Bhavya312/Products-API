const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'Must Provide the product name'],
    trim:true,
    maxlength:[20, 'name can not be more than 20 charcters'],
  },
  description:{
    type:String,
    trim:true,
    maxlength:[50, 'description must not be more than 50 characters'],
  },
  image:{
    type:String,
    trim:true,
  },
  price:{
    type:Number,
    required:[true, 'Must Povide the product price']
  },
  quantity:{
    type:Number,
    required:[true, 'Must provide the quantites']
  }
},{timestamps:true});

module.exports = mongoose.model('Product', ProductSchema);