var mongoose = require('mongoose');

var labsSchema = new mongoose.Schema(
  {
      title: {type:String, required:true},
      displayImage : {type:String, required:true},
      videoSnippet : {type:String, required:true},
      fullVideo : {type:String, required:true},
      synopsis: {type:String, required:true},
      description : {type:String, required: true}
  }
);

mongoose.model('LabItem', labsSchema);