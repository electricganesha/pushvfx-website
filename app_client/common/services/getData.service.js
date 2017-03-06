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
      return $http.get('/api/getProjectsByCategory/' + category);
    };

    var teammembers = function () {
      return $http.get('/api/team');
    };

    var getinstaphotos = function () {
      return $.ajax({
          method: 'GET',
          url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=1531248300.a24f5b9.559baeffc91f4ee8bef32d04378132bd',
          defaultHeaders: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              'Accept': 'application/json'
           },
          dataType: 'jsonp',
          success: function (response) {
          },
          error: function (xhr) {
            console.log("error ");
            console.log(xhr);
          }
      });
    }

    var reels = function () {
      return $http.get('/api/reels');
    };
    
    var reelsByCat = function (category) {
      return $http.get('/api/getReelsByCategory/' + category);
    };

    var newsByYear = function (newsYear) {
      return $http.get('/api/getnewsbyyear/' + newsYear);
    };

    var lastSixNews = function () {
      return $http.get('/api/getlastsixnews');
    };

    var newsByDate = function (date) {
      return $http.get('/api/getnewsbydate/' + date);
    };

    var oneNew = function (id) {
      return $http.get('/api/news/' + id);
    }

    var projectById = function (id) {
      return $http.get('/api/projects/' + id);
    }

    return {
      latestwork : latestwork,
      portfolio : portfolio,
      teammembers : teammembers,  
      getinstaphotos : getinstaphotos,
      reels : reels,
      reelsByCat : reelsByCat,
      newsByYear : newsByYear,
      lastSixNews : lastSixNews,
      newsByDate : newsByDate,
      oneNew : oneNew,
      projectById : projectById
    };
  }

})();