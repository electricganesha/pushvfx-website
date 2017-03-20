var mongoose = require('mongoose');
var StructuralInfo = mongoose.model('StructuralInfo');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET structuralInfo */
module.exports.structuralInfoGet = function(req, res) {
    StructuralInfo.find({}, function(err, stInfo) {
       res.json(stInfo);
  });
};

/* POST structuralInfo */
/* /api/structuralInfo */
module.exports.structuralInfoCreate = function(req, res) {
  StructuralInfo.create({
    homePageImage1: req.body.homePageImage1,
    homePageImage2: req.body.homePageImage2,
    portfolioImage1Film: req.body.portfolioImage1Film,
    portfolioImage2Interactive: req.body.portfolioImage2Interactive,
    textContacts: req.body.textContacts,
    textTeam: req.body.textTeam,
    textLab: req.body.textLab,
  }, function(err, siItem) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        sendJSONresponse(res, 201, siItem);
    }
  });
};

/* PUT /api/structuralInfo/:siId */
module.exports.structuralInfoUpdate = function(req, res) {
  if (!req.params.siItem) {
    sendJSONresponse(res, 404, {
      "message": "Not found, siId is required"
    });
    return;
  }
  StructuralInfo
    .findById(req.params.siId)
    .exec(
      function(err, siItem) {
        if (!siItem) {
          sendJSONresponse(res, 404, {
            "message": "siId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        if(req.body.homePageImage1)
        siItem.title = req.body.homePageImage1;

        if(req.body.homePageImage2)
        siItem.dateOfEvent = req.body.homePageImage2;

        if(req.body.portfolioImage1Film)
        siItem.thumbnail = req.body.portfolioImage1Film;

        if(req.body.portfolioImage2Interactive)
        siItem.synopsis = req.body.portfolioImage2Interactive;

        if(req.body.textContacts)
        siItem.description = req.body.textContacts;

        if(req.body.textTeam)
        siItem.stills = req.body.textTeam;

        if(req.body.textLab)
        siItem.stills = req.body.textLab;

        siItem.save(function(err, siItem) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, siItem);
          }
        });
      }
  );
};

/* DELETE /api/structuralInfo/:siId */
module.exports.structuralInfoDelete = function(req, res) {
  var siId = req.params.siId;
  if (siId) {
    StructuralInfo
      .findByIdAndRemove(siId)
      .exec(
        function(err, siItem) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No siId"
    });
  }
};
