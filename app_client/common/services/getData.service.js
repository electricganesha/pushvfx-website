(function() {

  angular
    .module('sitePUSH')
    .service('getData', getData);

  getData.$inject = ['$http'];
  function getData ($http) {

    var latestwork = function () {
      return $http.get('/api/getBestProjects');
    };

    return {
      latestwork : latestwork, 
    };
  }

})();