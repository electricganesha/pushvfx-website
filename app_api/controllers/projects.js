var mongoose = require('mongoose');
var Proj = mongoose.model('Project');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of locations */
module.exports.projectsList = function(req, res) {
    Proj.find({}, function(err, projects) {
       res.json(projects);
  });
};

module.exports.projectCreate = function(req, res) {
  Proj.create({
    name: req.body.name,
    showcaseVideo: req.body.showcaseVideo,
    titleSynopsis: req.body.titleSynopsis,
    fullVideo: req.body.fullVideo,
    mainTitle:req.body.mainTitle,
    mainType:req.body.mainType,
    description:req.body.description,
    credits:req.body.credits,
    status:req.body.status,
    screenshots:[req.body.screenshot1, req.body.screenshot2, req.body.screenshot3],
  }, function(err, project) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        console.log(project);
        sendJSONresponse(res, 201, project);
    }
  });
};
