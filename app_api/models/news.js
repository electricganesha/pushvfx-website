var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema(
  {
      title: {type:String, required:true},
      dateOfEvent: {type:Date, required:true},
      thumbnail : {type:String, required:true},
      topTitle : {type:String, required:true},
      synopsis : {type:String, required: true},
      description: {type:String, required:true},
      stills:[String]
}
);

mongoose.model('NewsClip', newsSchema);
