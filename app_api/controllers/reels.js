var mongoose = require('mongoose');
var Reel = mongoose.model('Reel');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of reels */
module.exports.reelsList = function(req, res) {
  Reel.find({}, function(err, reels) {
    res.json(reels);
  });
};

/* GET a reel by its id */
module.exports.reelsReadOne = function(req, res) {
  console.log('Finding reel details', req.params);
  if (req.params && req.params.reelId) {
    Reel
    .findById(req.params.reelId)
    .exec(function(err, reel) {
      if (!reel) {
        sendJSONresponse(res, 404, {
          "message": "reelId not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(reel);
      sendJSONresponse(res, 200, reel);
    });
  } else {
    console.log('No reelId specified');
    sendJSONresponse(res, 404, {
      "message": "No reelId in request"
    });
  }
};

/* GET reels by category */
/* /api/bestreels/ */
module.exports.getReelsByCategory = function(req,res)
{
  var categories = req.params.categories.split("&");

  switch(categories.length)
  {
    case(0):
    sendJSONresponse(res, 404, {
      "message": "Please search with parameters : param1&param2 ..."
    });
    break;
    case(1):
      Reel.find({categories: { $in:[categories[0]]} }).exec(function(err, reels) {
        res.json(reels);
      });
    break;
    case(2):
      Reel.find({$and: [{categories: { $in:[categories[0]]} },{categories: { $in:[categories[1]]} }]}).exec(function(err, reels) {
        res.json(reels);
      });
    break;
    case(3):
      Reel.find({$and: [{categories: { $in:[categories[0]]} },{categories: { $in:[categories[1]]} },{categories: { $in:[categories[2]]} }]}).exec(function(err, reels) {
        res.json(reels);
      });
    break;
    case(4):
      Reel.find({$and: [{categories: { $in:[categories[0]]} },{categories: { $in:[categories[1]]} }, {categories: { $in:[categories[2]]} },{categories: { $in:[categories[3]]} }]}).exec(function(err, reels) {
        res.json(reels);
      });
    break;
  }
}

/* POST a new reel */
/* /api/reels */
module.exports.reelCreate = function(req, res) {
  console.log("CRIAR REEL");
  console.log(req);
  Reel.create({
    still: req.body.still,
    dateOfReel: new Date(req.body.dateOfReel),
    link: req.body.link,
    categories: req.body.categories,
  }, function(err, reel) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(reel);
      sendJSONresponse(res, 201, reel);
    }
  });
};

/* PUT /api/reels/:reelId */
module.exports.reelsUpdateOne = function(req, res) {
  if (!req.params.reelId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, reelId is required"
    });
    return;
  }
  Reel
  .findById(req.params.reelId)
  .exec(
    function(err, reel) {
      if (!reel) {
        sendJSONresponse(res, 404, {
          "message": "reelId not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }

      if(req.body.still)
        reel.still = req.body.still;

      if(req.body.dateOfReel)
        reel.dateOfReel = req.body.dateOfReel;

      if(req.body.link)
        reel.link = req.body.link;

      if(req.body.categories)
        reel.categories = req.body.categories;

      reel.save(function(err, reel) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, reel);
        }
      });
    }
  );
};

/* DELETE /api/reels/:reelId */
module.exports.reelsDeleteOne = function(req, res) {
  var reelId = req.params.reelId;
  if (reelId) {
    Reel
    .findByIdAndRemove(reelId)
    .exec(
      function(err, reel) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log("reel id " + reelId + " deleted");
        sendJSONresponse(res, 204, null);
      }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No reelId"
    });
  }
};
