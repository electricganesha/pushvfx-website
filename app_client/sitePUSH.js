(function() {

angular.module('sitePUSH', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'anguvideo', 'ngMap']);

function config($routeProvider, $locationProvider)
{
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.view.html',
    controller: 'homeCtrl'
    })
  .when('/portfolio', {
    templateUrl: 'portfolio/portfolio.view.html',
    controller: 'portfolioCtrl'
  })
  .when('/team', {
    templateUrl: 'team/team.view.html',
    controller: 'teamCtrl'
  })
  .when('/reel', {
    templateUrl: 'reel/reel.view.html',
    controller: 'reelCtrl'
  })
  .when('/contacts',{
    templateUrl: '/contacts/contacts.view.html',
    controller: 'contactsCtrl'
  })
  .when('/timeline',{
    templateUrl: '/timeline/timeline.view.html',
    controller: 'timelineCtrl'
  })
  .when('/news',{
    templateUrl: '/news/news.view.html',
    controller: 'newsCtrl'
  })
  .when('/projects',{
    templateUrl: '/projects/projects.view.html',
    controller: 'projectsCtrl'
  })
  .when('/disclaimer',{
    templateUrl: '/disclaimer/disclaimer.view.html',
    controller: 'disclaimerCtrl'
  })
  .when('/lab',{
    templateUrl: '/lab/lab.view.html',
    controller: 'labCtrl'
  })
  .when('/career',{
    templateUrl: '/career/career.view.html',
    controller: 'careerCtrl'
  })
  .when('/whatwedo',{
    templateUrl: '/whatwedo/whatwedo.view.html',
    controller: 'whatwedoCtrl'
  })
  .when('/category',{
    templateUrl: '/category/category.view.html',
    controller: 'categoryCtrl'
  })
  .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode({
  	enabled: false,
  	requireBase: true,
  	rewriteLinks: true
	});
}

angular.module('sitePUSH')
.config(['$routeProvider', '$locationProvider', config]);

}) ();
