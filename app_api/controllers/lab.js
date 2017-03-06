var mongoose = require('mongoose');
var Lab = mongoose.model('LabItem');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of lab items */
module.exports.labList = function(req, res) {
    Lab.find({}, function(err, labitems) {
       res.json(labitems);
  });
};

/* GET a labitem by its id */
module.exports.labReadOne = function(req, res) {
  console.log('Finding lab item details', req.params);
  if (req.params && req.params.labId) {
    Lab
      .findById(req.params.labId)
      .exec(function(err, labitem) {
        if (!labitem) {
          sendJSONresponse(res, 404, {
            "message": "labId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(labitem);
        sendJSONresponse(res, 200, labitem);
      });
  } else {
    console.log('No labId specified');
    sendJSONresponse(res, 404, {
      "message": "No labId in request"
    });
  }
};

/* POST a new labitem */
/* /api/lab */
module.exports.labCreate = function(req, res) {
  Lab.create({
    title: req.body.title,
    displayImage: req.body.displayImage,
    videoSnippet: req.body.videoSnippet,
    fullVideo: req.body.fullVideo,
    synopsis: req.body.synopsis,
    description: req.body.description
  }, function(err, labitem) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        console.log(labitem);
        sendJSONresponse(res, 201, labitem);
    }
  });
};

/* PUT /api/lab/:labId */
module.exports.labUpdateOne = function(req, res) {
  if (!req.params.labId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, labId is required"
    });
    return;
  }
  Lab
    .findById(req.params.labId)
    .exec(
      function(err, labitem) {
        if (!labitem) {
          sendJSONresponse(res, 404, {
            "message": "labId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        
        if(req.body.title)
            labitem.title = req.body.title;

        if(req.body.displayImage)
            labitem.displayImage = req.body.displayImage;

        if(req.body.videoSnippet)
            labitem.videoSnippet = req.body.videoSnippet;

        if(req.body.fullVideo)
            labitem.fullVideo = req.body.fullVideo;
        
        if(req.body.synopsis)
            labitem.synopsis = req.body.synopsis;

        if(req.body.description)
            labitem.description = req.body.description;

        labitem.save(function(err, labitem) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, labitem);
          }
        });
      }
  );
};

/* DELETE /api/lab/:labId */
module.exports.labDeleteOne = function(req, res) {
  var labId = req.params.labId;
  if (labId) {
    Lab
      .findByIdAndRemove(labId)
      .exec(
        function(err, labitem) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Lab id " + labId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No labId"
    });
  }
};