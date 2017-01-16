var mongoose = require('mongoose');
var Team = mongoose.model('TeamMember');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of team members */
module.exports.teamList = function(req, res) {
    Team.find({}, function(err, team) {
       res.json(team);
  });
};

/* GET a team member by its id */
module.exports.teamReadOne = function(req, res) {
  console.log('Finding team details', req.params);
  if (req.params && req.params.teamId) {
    Team
      .findById(req.params.teamId)
      .exec(function(err, teammember) {
        if (!teammember) {
          sendJSONresponse(res, 404, {
            "message": "teamId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(teammember);
        sendJSONresponse(res, 200, teammember);
      });
  } else {
    console.log('No teamId specified');
    sendJSONresponse(res, 404, {
      "message": "No teamId in request"
    });
  }
};

/* POST a new team member */
/* /api/team */
module.exports.teamCreate = function(req, res) {
  Team.create({
    name: req.body.name,
    profilePic: req.body.profilePic,
    skills: req.body.skills,
    website: req.body.website
  }, function(err, teammember) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        console.log(teammember);
        sendJSONresponse(res, 201, teammember);
    }
  });
};

/* PUT /api/team/:teamId */
module.exports.teamUpdateOne = function(req, res) {
  if (!req.params.teamId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, teamId is required"
    });
    return;
  }
  Team
    .findById(req.params.teamId)
    .exec(
      function(err, teammember) {
        if (!teammember) {
          sendJSONresponse(res, 404, {
            "message": "teamId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        
        if(req.body.name)
            teammember.name = req.body.name;

        if(req.body.profilePic)
            teammember.profilePic = req.body.profilePic;
        
        if(req.body.skills)
            teammember.skills = req.body.skills;

        if(req.body.website)
            teammember.website = req.body.website;

        teammember.save(function(err, teammember) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, teammember);
          }
        });
      }
  );
};

/* DELETE /api/team/:teamId */
module.exports.teamDeleteOne = function(req, res) {
  var teamId = req.params.teamId;
  if (teamId) {
    Team
      .findByIdAndRemove(teamId)
      .exec(
        function(err, teammember) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Team id " + teamId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No teamId"
    });
  }
};