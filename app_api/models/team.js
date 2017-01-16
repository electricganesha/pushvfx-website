var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema(
  {
      name: {type:String, required:true},
      profilePic : {type:String, required:true},
      skills : {type:String, required: true},
      website : {type:String, required: true},
  }
);

mongoose.model('TeamMember', teamSchema);