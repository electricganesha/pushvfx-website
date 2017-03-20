var mongoose = require('mongoose');
var Category = mongoose.model('Category');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of category items */
module.exports.categoryList = function(req, res) {
    Category.find({}, function(err, categorys) {
       res.json(categorys);
  });
};

/* GET a category by its id */
module.exports.categoryReadOne = function(req, res) {
  if (req.params && req.params.categoryId) {
    Category
      .findById(req.params.categoryId)
      .exec(function(err, category) {
        if (!category) {
          sendJSONresponse(res, 404, {
            "message": "categoryId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJSONresponse(res, 200, category);
      });
  } else {
    console.log('No categoryId specified');
    sendJSONresponse(res, 404, {
      "message": "No categoryId in request"
    });
  }
};

/* POST a new category */
/* /api/category */
module.exports.categoryCreate = function(req, res) {
  Category.create({
    title: req.body.title,
    description: req.body.description,
    stills: req.body.stills
  }, function(err, category) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        sendJSONresponse(res, 201, category);
    }
  });
};

/* PUT /api/category/:categoryId */
module.exports.categoryUpdateOne = function(req, res) {
  if (!req.params.categoryId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, categoryId is required"
    });
    return;
  }
  Category
    .findById(req.params.categoryId)
    .exec(
      function(err, category) {
        if (!category) {
          sendJSONresponse(res, 404, {
            "message": "categoryId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        if(req.body.title)
            category.title = req.body.title;

        if(req.body.displayImage)
            category.displayImage = req.body.displayImage;

        if(req.body.link)
            category.link = req.body.link;

        if(req.body.synopsis)
            category.synopsis = req.body.synopsis;

        category.save(function(err, category) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, category);
          }
        });
      }
  );
};

/* DELETE /api/category/:categoryId */
module.exports.categoryDeleteOne = function(req, res) {
  var categoryId = req.params.categoryId;
  if (categoryId) {
    Category
      .findByIdAndRemove(categoryId)
      .exec(
        function(err, category) {
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
      "message": "No categoryId"
    });
  }
};
