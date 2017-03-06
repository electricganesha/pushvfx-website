var mongoose = require('mongoose');

var careersSchema = new mongoose.Schema(
  {
      title: {type:String, required:true},
      datePosted : {type:Date, required:true},
      dateOpen : {type:Date},
      dateClosed : {type:Date},
      location : {type:String, required:true},
      situation : {type:String, required:true, enum:['Permanent','Temporary']},
      schedule: {type:String, required:true, enum:['Full-Time','Part-Time']},
      salary:{type:String, required:true},
      description : {type:String, required: true},
      requirements : {type:String, required: true},
      email:{type:String, required: true}
  }
);

mongoose.model('CareerItem', careersSchema);
