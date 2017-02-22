var mongoose = require('mongoose');

var socialNetworksSchema = new mongoose.Schema(
  {
    name: {type:String, required:true, enum:['Instagram','Linkedin','Website']},
    value: {type:String, required:true}
  }
)

var teamSchema = new mongoose.Schema(
  {
      name: {type:String, required:true},
      profilePic : {type:String, required:true},
      description: {type:String, required:true},
      skills :[String],
      social: [socialNetworksSchema]
  }
);

mongoose.model('TeamMember', teamSchema);
