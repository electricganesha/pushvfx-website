var express = require('express');
var router = express.Router();

/*var ctrlAuth = require('../controllers/authentication');*/
var ctrlStructure = require('../controllers/structure');
var ctrlProjects = require('../controllers/projects');
var ctrlNews = require('../controllers/news');
var ctrlTeam = require('../controllers/team');
var ctrlLab = require('../controllers/lab');
var ctrlReel = require('../controllers/reels');
var ctrlCareer = require('../controllers/careers');
var ctrlCategories = require('../controllers/categories');
var ctrlMailer = require('../controllers/mailerservice');

//mailerservice
router.post('/mailerservice', ctrlMailer.sendContactEmail); //send contact email

//structuralInfo
router.get('/structuralInfo', ctrlStructure.structuralInfoGet); //get structural info
router.post('/structuralInfo', ctrlStructure.structuralInfoCreate); //create structural info
router.put('/structuralInfo/:siId', ctrlStructure.structuralInfoUpdate); //edit structural info
router.delete('/structuralInfo/:siId', ctrlStructure.structuralInfoDelete); //delete structural info

//projects
router.get('/projects', ctrlProjects.projectsList); //get all projects
router.post('/projects', ctrlProjects.projectCreate); //create a new project
router.get('/getBestProjects', ctrlProjects.getBestProjects); //get last 6 best projects
router.get('/getProjectsByCategory/:category', ctrlProjects.getProjectsByCategory); //get last 6 best projects
router.get('/getProjectsBySubCategory/:subcategories', ctrlProjects.getProjectsBySubCategory); //get last 6 best projects
router.get('/projects/:projectId', ctrlProjects.projectsReadOne); //get project by id
router.put('/projects/:projectId', ctrlProjects.projectsUpdateOne); //edit project by id
router.delete('/projects/:projectId', ctrlProjects.projectsDeleteOne); //delete project by id

//news
router.get('/news', ctrlNews.newsList); //get all news
router.post('/news', ctrlNews.newsCreate); //create a new newsclip
router.get('/getlastsixnews', ctrlNews.getLastSixNews); //get last 6 news
router.get('/getnewsbyyear/:newsYear', ctrlNews.getNewsByYear); //get all news of a certain year
router.get('/getnewsbydate/:newsDate', ctrlNews.getnewsByDate); //get all news of a certain date
router.get('/news/:newsId', ctrlNews.newsReadOne); //get newsclip by id
router.put('/news/:newsId', ctrlNews.newsUpdateOne); //edit newsclip by id
router.delete('/news/:newsId', ctrlNews.newsDeleteOne); //delete newsclip by id

//team
router.get('/team', ctrlTeam.teamList); //get all team members
router.post('/team', ctrlTeam.teamCreate); //create a new team member
router.get('/team/:teamId', ctrlTeam.teamReadOne); //get team member by id
router.put('/news/:teamId', ctrlTeam.teamUpdateOne); //edit newteam membersclip by id
router.delete('/news/:teamId', ctrlTeam.teamDeleteOne); //delete team member by id

//lab
router.get('/lab', ctrlLab.labList); //get all lab items
router.post('/lab', ctrlLab.labCreate); //create a new lab item
router.get('/lab/:labId', ctrlLab.labReadOne); //get lab items by id
router.put('/lab/:labId', ctrlLab.labUpdateOne); //edit lab items by id
router.delete('/lab/:labId', ctrlLab.labDeleteOne); //delete lab items by id

//reel
router.get('/reels', ctrlReel.reelsList); //get all projects
router.post('/reels', ctrlReel.reelCreate); //create a new project
router.get('/getReelsByCategory/:categories', ctrlReel.getReelsByCategory); //get last 6 best projects
router.get('/reels/:reelId', ctrlReel.reelsReadOne); //get project by id
router.put('/reels/:reelId', ctrlReel.reelsUpdateOne); //edit project by id
router.delete('/reels/:reelId', ctrlReel.reelsDeleteOne); //delete project by id

//career
router.get('/career', ctrlCareer.careerList); //get all career items
router.post('/career', ctrlCareer.careerCreate); //create a new career item
router.get('/career/:career', ctrlCareer.careerReadOne); //get career items by id
router.put('/career/:career', ctrlCareer.careerUpdateOne); //edit career items by id
router.delete('/career/:career', ctrlCareer.careerDeleteOne); //delete career items by id

//categories
router.get('/categories', ctrlCategories.categoryList); //get all category items
router.post('/categories', ctrlCategories.categoryCreate); //create a new category item
router.get('/categories/:categoryId', ctrlCategories.categoryReadOne); //get category items by id
router.put('/categories/:categoryId', ctrlCategories.categoryUpdateOne); //edit category items by id
router.delete('/categories/:categoryId', ctrlCategories.categoryDeleteOne); //delete category items by id

module.exports = router;
