var mongoose = require('mongoose');
var News = mongoose.model('NewsClip');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of news */
module.exports.newsList = function(req, res) {
    News.find({}, function(err, news) {
       res.json(news);
  });
};

/* GET a newsclip by its id */
module.exports.newsReadOne = function(req, res) {
  if (req.params && req.params.newsId) {
    News
      .findById(req.params.newsId)
      .exec(function(err, newsclip) {
        if (!newsclip) {
          sendJSONresponse(res, 404, {
            "message": "newsId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(newsclip);
        sendJSONresponse(res, 200, newsclip);
      });
  } else {
    console.log('No newsId specified');
    sendJSONresponse(res, 404, {
      "message": "No newsId in request"
    });
  }
};

module.exports.getLastSixNews = function(req,res) {
  News.find().sort('-dateOfEvent').limit(6).exec(function(err, news) {
    res.json(news);
  });
}

module.exports.getNewsByYear = function(req,res) {
  News.find({ "dateOfEvent": {"$gte" : new Date(req.params.newsYear,0,1), "$lt": new Date(req.params.newsYear,11,31)}}).exec(function(err, news) {
    res.json(news);
  });
}

module.exports.getnewsByDate = function(req,res) {
  News.find({ "dateOfEvent": req.params.newsDate}).sort('-dateOfEvent').exec(function(err, news) {
    res.json(news);
  });
}

/* POST a new news */
/* /api/news */
module.exports.newsCreate = function(req, res) {
  News.create({
    title: req.body.title,
    dateOfEvent: req.body.dateOfEvent,
    thumbnail: req.body.thumbnail,
    topTitle: req.body.topTitle,
    synopsis: req.body.synopsis,
    description: req.body.description,
    stills: req.body.stills,
  }, function(err, newsclip) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        console.log(newsclip);
        sendJSONresponse(res, 201, newsclip);
    }
  });
};

/* PUT /api/news/:newsId */
module.exports.newsUpdateOne = function(req, res) {
  if (!req.params.newsId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, newsId is required"
    });
    return;
  }
  News
    .findById(req.params.newsId)
    .exec(
      function(err, newsclip) {
        if (!newsclip) {
          sendJSONresponse(res, 404, {
            "message": "newsId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        if(req.body.title)
        newsclip.title = req.body.title;

        if(req.body.dateOfEvent)
        newsclip.dateOfEvent = req.body.dateOfEvent;

        if(req.body.thumbnail)
        newsclip.thumbnail = req.body.thumbnail;

        if(req.body.topTitle)
        newsclip.topTitle = req.body.topTitle;

        if(req.body.synopsis)
        newsclip.synopsis = req.body.synopsis;

        if(req.body.description)
        newsclip.description = req.body.description;

        if(req.body.stills)
        newsclip.stills = req.body.stills;

        newsclip.save(function(err, newsclip) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, newsclip);
          }
        });
      }
  );
};

/* DELETE /api/news/:newsId */
module.exports.newsDeleteOne = function(req, res) {
  var newsId = req.params.newsId;
  if (newsId) {
    News
      .findByIdAndRemove(newsId)
      .exec(
        function(err, newsclip) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("News id " + newsId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No newsId"
    });
  }
};
