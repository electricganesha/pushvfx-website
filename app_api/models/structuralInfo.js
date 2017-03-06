var mongoose = require('mongoose');

var structuralInfoSchema = new mongoose.Schema(
  {
      homePageImage1: {type:String, required:true},
      homePageImage2: {type:String, required:true},
      portfolioImage1Film : {type:String, required:true},
      portfolioImage2Interactive : {type:String, required: true},
      textContacts: {type:String, required:true},
      textTeam:{type:String, required:true},
      textLab:{type:String, required:true},
}
);

mongoose.model('StructuralInfo', structuralInfoSchema);
