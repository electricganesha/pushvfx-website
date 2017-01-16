var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema(
  {
      title: {type:String, required:true},
      displayImage : {type:String, required:true},
      synopsis : {type:String, required: true},
  }
);

mongoose.model('NewsClip', newsSchema);