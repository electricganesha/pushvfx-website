var mongoose = require('mongoose');

var reelSchema = new mongoose.Schema(
  {
      still: {type:String, required:true},
      dateOfReel: {type:Date, required:true},
      link : {type:String, required:true},
      categories : {type:[String], required: true}
  }
);

mongoose.model('Reel', reelSchema);
