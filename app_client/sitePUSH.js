(function() {

angular.module('sitePUSH', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

function config($routeProvider, $locationProvider)
{
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.view.html',
    controller: 'homeCtrl',
    controllerAs: 'vm'
    })
  .when('/portfolio', {
    templateUrl: 'portfolio/portfolio.view.html',
    controller: 'portfolioCtrl',
    controllerAs: 'vm'
  });/*
  .when('/location/:locationid', {
    templateUrl: '/locationDetail/location.view.html',
    controller: 'locationDetailCtrl',
    controllerAs: 'vm'
  })
  .when('/register', {
    templateUrl: '/auth/register/register.view.html',
    controller: 'registerCtrl',
    controllerAs: 'vm'
  })
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