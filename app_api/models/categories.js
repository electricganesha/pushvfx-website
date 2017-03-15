var mongoose = require('mongoose');

var categoryStillSchema = new mongoose.Schema(
  {
      still: {type:String, required:true}, // LINK DESCRIPTION
      link: {type:String, required:true} // LINK
  }
);

var categorySchema = new mongoose.Schema(
  {
      title: {type:String, required:true},
      description: {type:String, required:true},
      stills:[categoryStillSchema]
}
);

mongoose.model('Category', categorySchema);
