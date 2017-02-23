(function() {

  angular
    .module('sitePUSH')
    .service('getData', getData);

  getData.$inject = ['$http'];
  function getData ($http) {

    var latestwork = function () {
      return $http.get('/api/getBestProjects');
    };

    var portfolio = function (category) {
      console.log(category);
      return $http.get('/api/getProjectsByCategory/' + category);
    };

    return {
      latestwork : latestwork,
      portfolio : portfolio  
    };
  }

})();