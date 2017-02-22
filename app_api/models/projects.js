var mongoose = require('mongoose');

var creditsSchema = new mongoose.Schema(
  {
      title: {type:String, required:true}, // TITLE OF CREDIT : e.g. DIRECTOR
      name: {type:String, required:true} // NAME OF PERSON
  }
);

var projectSchema = new mongoose.Schema(
  {
      name: {type:String, required:true, unique:true}, // CODE NAME OF THE PROJECT
      dateOfProject: {type:Date, required:true},
      title: {type:String, required:true}, // PROJECT TITLE
      thumbnail:  {type:String, required:true}, // PROJECT THUMBNAIL
      showCaseStill : {type:String, required:true}, //STILL IMAGE SHOWING IN THE LIST / PROJECT PAGE
      showCaseVideo : {type:String, required:true}, // STILL VIDEO WHEN WE CLICK STILL IMAGE
      category: {type:String, required:true, enum:['Film','Motion','Interactive']}, // PROJECT CATEGORY
      subcategories: {type:[String]}, // PROJECT SUBCATEGORY
      credits:  [creditsSchema], // CREDITS - based on Credits Schema
      stills:  [String], // PROJECT STILLS
      description:  [String], // PROJECT DESCRIPTION : to be separated in paragraphs
      status: {type:String, enum:['Complete','Undergoing','Research','Prospective']}, // PROJECT STATUS :
      bestWork: {type:Boolean}
  }
);

mongoose.model('Project', projectSchema);
