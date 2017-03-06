var mongoose = require('mongoose');
var Career = mongoose.model('CareerItem');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of career items */
module.exports.careerList = function(req, res) {
    Career.find({}, function(err, careeritems) {
       res.json(careeritems);
  });
};

/* GET a careeritem by its id */
module.exports.careerReadOne = function(req, res) {
  console.log('Finding career item details', req.params);
  if (req.params && req.params.careerId) {
    Career
      .findById(req.params.careerId)
      .exec(function(err, careeritem) {
        if (!careeritem) {
          sendJSONresponse(res, 404, {
            "message": "careerId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(careeritem);
        sendJSONresponse(res, 200, careeritem);
      });
  } else {
    console.log('No careerId specified');
    sendJSONresponse(res, 404, {
      "message": "No careerId in request"
    });
  }
};

/* POST a new careeritem */
/* /api/career */
module.exports.careerCreate = function(req, res) {
  Career.create({
    title: req.body.title,
    datePosted: req.body.datePosted,
    dateOpen: req.body.dateOpen,
    dateClosed: req.body.dateClosed,
    location: req.body.location,
    situation: req.body.situation,
    schedule: req.body.schedule,
    salary: req.body.salary,
    description: req.body.description,
    requirements: req.body.requirements,
    email: req.body.email,
  }, function(err, careeritem) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        console.log(careeritem);
        sendJSONresponse(res, 201, careeritem);
    }
  });
};

/* PUT /api/career/:careerId */
module.exports.careerUpdateOne = function(req, res) {
  if (!req.params.careerId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, careerId is required"
    });
    return;
  }
  Career
    .findById(req.params.careerId)
    .exec(
      function(err, careeritem) {
        if (!careeritem) {
          sendJSONresponse(res, 404, {
            "message": "careerId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        if(req.body.title)
            careeritem.title = req.body.title;

        if(req.body.datePosted)
            careeritem.datePosted = req.body.datePosted;

        if(req.body.dateOpen)
            careeritem.dateOpen = req.body.dateOpen;

        if(req.body.dateClosed)
            careeritem.dateClosed = req.body.dateClosed;

        if(req.body.location)
            careeritem.location = req.body.location;

        if(req.body.situation)
            careeritem.situation = req.body.situation;

        if(req.body.schedule)
            careeritem.schedule = req.body.schedule;

        if(req.body.situation)
            careeritem.situation = req.body.situation;

        if(req.body.salary)
            careeritem.salary = req.body.salary;

        if(req.body.description)
            careeritem.description = req.body.description;

        if(req.body.requirements)
            careeritem.requirements = req.body.requirements;

        if(req.body.email)
            careeritem.email = req.body.email;

        careeritem.save(function(err, careeritem) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, careeritem);
          }
        });
      }
  );
};

/* DELETE /api/career/:careerId */
module.exports.careerDeleteOne = function(req, res) {
  var careerId = req.params.careerId;
  if (careerId) {
    Career
      .findByIdAndRemove(careerId)
      .exec(
        function(err, careeritem) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Career id " + careerId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No careerId"
    });
  }
};
