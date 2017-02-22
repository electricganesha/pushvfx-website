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


/* GET 6 of the lastest best projects */
/* /api/bestprojects */
module.exports.getBestProjects = function(req,res)
{
  Proj.find({bestWork:true}).sort('-dateCreated').limit(6).exec(function(err, projects) {
    res.json(projects);
  });
}

/* POST a new project */
/* /api/projects */
module.exports.projectCreate = function(req, res) {
  Proj.create({
    name: req.body.name,
    dateOfProject: new Date(req.body.dateOfProject),
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    showCaseStill: req.body.showCaseStill,
    showCaseVideo: req.body.showCaseVideo,
    category: req.body.category,
    subcategories: req.body.subcategories,
    credits: req.body.credits,
    stills: req.body.stills,
    description: req.body.description,
    status: req.body.status,
    bestWork: req.body.bestWork,
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

      if(req.body.dateOfProject)
      project.dateOfProject = req.body.dateOfProject;

      if(req.body.title)
      project.title = req.body.title;

      if(req.body.thumbnail)
      project.thumbnail = req.body.thumbnail;

      if(req.body.showCaseStill)
      project.showCaseStill = req.body.showCaseStill;

      if(req.body.showCaseVideo)
      project.showCaseVideo = req.body.showCaseVideo;

      if(req.body.category)
      project.category = req.body.category;

      if(req.body.subcategories)
      project.subcategories = req.body.subcategories;

      if(req.body.credits)
      project.credits = req.body.credits;

      if(req.body.stills)
      project.stills = req.body.stills;

      if(req.body.description)
      project.description = req.body.description;

      if(req.body.status)
      project.status = req.body.status;

      if(req.body.bestWork)
      project.bestWork = req.body.bestWork;

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
