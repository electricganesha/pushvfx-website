var express = require('express');
var router = express.Router();

/*var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');*/
var ctrlProjects = require('../controllers/projects');
/*var ctrlNews = require('../controllers/news');
var ctrlTeam = require('../controllers/team');
var ctrlLab = require('../controllers/lab');
var ctrlSiteStructure = require('../controllers/siteStructure');*/

//projects
router.get('/projects', ctrlProjects.projectsList); //get all projects
router.post('/projects', ctrlProjects.projectCreate); //create a new project
router.get('/projects/:projectId', ctrlProjects.projectsReadOne); //get project by id
router.put('/projects/:projectId', ctrlProjects.projectsUpdateOne); //edit project by id
router.delete('/projects/:projectId', ctrlProjects.projectsDeleteOne); //delete project by id

module.exports = router;