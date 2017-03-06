var mongoose = require('mongoose');

var labsSchema = new mongoose.Schema(
  {
      title: {type:String, required:true},
      displayImage : {type:String, required:true},
      link : {type:String, required:true},
      synopsis: {type:String, required:true}
  }
);

mongoose.model('LabItem', labsSchema);