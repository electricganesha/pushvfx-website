var mongoose = require('mongoose');
var Proj = mongoose.model('Project');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of projects */
module.exports.projectsList = function(req, res) {
    Proj.find({}, function(err, projects) {
       res.json(projects);
  });
};

/* GET a project by its id */
module.exports.projectsReadOne = function(req, res) {
  console.log('Finding project details', req.params);
  if (req.params && req.params.projectId) {
    Proj
      .findById(req.params.projectId)
      .exec(function(err, project) {
        if (!project) {
          sendJSONresponse(res, 404, {
            "message": "projectId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(project);
        sendJSONresponse(res, 200, project);
      });
  } else {
    console.log('No projectId specified');
    sendJSONresponse(res, 404, {
      "message": "No projectId in request"
    });
  }
};

/* POST a new project */
/* /api/projects */
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

/* PUT /api/projects/:projectId */
module.exports.projectsUpdateOne = function(req, res) {
  if (!req.params.projectId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, projectId is required"
    });
    return;
  }
  Proj
    .findById(req.params.projectId)
    .exec(
      function(err, project) {
        if (!project) {
          sendJSONresponse(res, 404, {
            "message": "projectId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        
        if(req.body.name)
            project.name = req.body.name;

        if(req.body.showcaseVideo)
            project.showcaseVideo = req.body.showcaseVideo;
        
        if(req.body.titleSynopsis)
            project.titleSynopsis = req.body.titleSynopsis;
        
        if(req.body.fullVideo)
            project.fullVideo = req.body.fullVideo;
        
        if(req.body.mainTitle)
            project.mainTitle = req.body.mainTitle;
        
        if(req.body.mainType)
            project.mainType = req.body.mainType;
        
        if(req.body.description)
            project.description = req.body.description;
        
        if(req.body.credits)
            project.credits = req.body.credits;
        
        if(req.body.status)
            project.status = req.body.status;
        
        if(req.body.screenshot1 && req.body.screenshot2 && req.body.screenshot3) 
            project.screenshots = [req.body.screenshot1, req.body.screenshot2, req.body.screenshot3];
        
        project.save(function(err, project) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, project);
          }
        });
      }
  );
};

/* DELETE /api/projects/:projectId */
module.exports.projectsDeleteOne = function(req, res) {
  var projectId = req.params.projectId;
  if (projectId) {
    Proj
      .findByIdAndRemove(projectId)
      .exec(
        function(err, project) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Project id " + projectId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No projectId"
    });
  }
};