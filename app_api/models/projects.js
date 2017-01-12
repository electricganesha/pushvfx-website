var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
  {
      name: {type:String, required:true},
      showcaseVideo : {type:String, required:true},
      titleSynopsis : {type:String, required: true},
      fullVideo: String,
      mainTitle: String,
      mainType: String,
      description: String,
      credits: String,
      status: String,
      screenshots: [String,String,String]
  }
);

mongoose.model('Project', projectSchema);