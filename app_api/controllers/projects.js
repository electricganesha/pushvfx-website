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
      sendJSONresponse(res, 200, project);
    });
  } else {
    console.log('No projectId specified');
    sendJSONresponse(res, 404, {
      "message": "No projectId in request"
    });
  }
};

/* GET projects by category */
/* /api/bestprojects/ */
module.exports.getProjectsByCategory = function(req,res)
{

  Proj.find({category: req.params.category}).sort('-dateCreated').exec(function(err, projects) {
    res.json(projects);
  });
}

/* GET projects by subcategory */
/* /api/bestprojects/ */
module.exports.getProjectsBySubCategory = function(req,res)
{
  var subcategories = req.params.subcategories.split("&");

  switch(subcategories.length)
  {
    case(0):
    sendJSONresponse(res, 404, {
      "message": "Please search with parameters : param1&param2 ..."
    });
    break;
    case(1):
      Proj.find({subcategories: { $in:[subcategories[0]]} }).sort('-dateCreated').exec(function(err, projects) {
        res.json(projects);
      });
    break;
    case(2):
      Proj.find({$and: [{subcategories: { $in:[subcategories[0]]} },{subcategories: { $in:[subcategories[1]]} }]}).sort('-dateCreated').exec(function(err, projects) {
        res.json(projects);
      });
    break;
    case(3):
      Proj.find({$and: [{subcategories: { $in:[subcategories[0]]} },{subcategories: { $in:[subcategories[1]]} },{subcategories: { $in:[subcategories[2]]} }]}).sort('-dateCreated').exec(function(err, projects) {
        res.json(projects);
      });
    break;
    case(4):
      Proj.find({$and: [{subcategories: { $in:[subcategories[0]]} },{subcategories: { $in:[subcategories[1]]} }, {subcategories: { $in:[subcategories[2]]} },{subcategories: { $in:[subcategories[3]]} }]}).sort('-dateCreated').exec(function(err, projects) {
        res.json(projects);
      });
    break;
  }
}


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
    midPageStill: req.body.midPageStill,
    midPageVideo: req.body.midPageVideo,
    bottomPageStill:req.body.bottomPageStill,
    bottomPagetext: req.body.bottomPagetext,
    category: req.body.category,
    subcategories: req.body.subcategories,
    credits: req.body.credits,
    links: req.body.links,
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

      if(req.body.midPageStill)
      project.midPageStill = req.body.midPageStill;

      if(req.body.midPageVideo)
      project.midPageVideo = req.body.midPageVideo;

      if(req.body.bottomPageStill)
      project.bottomPageStill = req.body.bottomPageStill;

      if(req.body.bottomPagetext)
      project.bottomPagetext = req.body.bottomPagetext;

      if(req.body.category)
      project.category = req.body.category;

      if(req.body.subcategories)
      project.subcategories = req.body.subcategories;

      if(req.body.credits)
      project.credits = req.body.credits;

      if(req.body.links)
      project.links = req.body.links;

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
