const mongoose = require('mongoose')

const AnimeSchema = new mongoose.Schema({
  video:{
    type:String,
    trim:true,
    required:true,
  }
});

module.exports = mongoose.model('Anime', AnimeSchema);