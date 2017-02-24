(function() {

angular.module('sitePUSH', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

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
  });/*
  .when('/login',{
    templateUrl: '/auth/login/login.view.html',
    controller: 'loginCtrl',
    controllerAs: 'vm'
  })*/
  //.otherwise({redirectTo: '/'});

  $locationProvider.html5Mode({
    enabled:true,
    requireBase: false
  });
}

angular.module('sitePUSH')
.config(['$routeProvider', '$locationProvider', config]);

}) ();