(function () {

  angular
    .module('sitePUSH')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function homeCtrl ($scope, getData, saveNewsId) {

    var arrayImg1 = new Array();
    arrayImg1[0] = "film1.jpg";
    arrayImg1[1] = "film2.jpg";
    arrayImg1[2] = "interactive_data.jpg";
    arrayImg1[3] = "film4.jpg";
    arrayImg1[4] = "Interactive.jpg";

    var arrayImg2 = new Array();
    arrayImg2[0] = "film3.jpg";
    arrayImg2[1] = "film5.jpg";
    arrayImg2[2] = "animation.jpg";
    arrayImg2[3] = "interactive1.jpg";
    arrayImg2[4] = "film.jpg";


    getRandomImage(arrayImg1, "");
    getRandomImage1(arrayImg2, "");

    function getRandomImage(imgAr, path) {
        path = path || 'https://pushvfx.com/pics/stills/'; // default path here
        var num = Math.floor( Math.random() * imgAr.length );
        var img = imgAr[ num ];
        $scope.mainStill1 = path + img;
    }

    function getRandomImage1(imgAr, path) {
        path = path || 'https://pushvfx.com/pics/stills/'; // default path here
        var num = Math.floor( Math.random() * imgAr.length );
        var img = imgAr[ num ];
        $scope.mainStill2 = path + img;
    }

    var lastScrollTop = 0;
    var up = false;
    var viewportWidth = $(window).width();
    
    if(viewportWidth > 1000){
      $(window).scroll(function(event){
        if($(this).scrollTop()){
          var st = $(this).scrollTop();
          if (st > lastScrollTop){
            if(up == false){
              $("#cabecalho").animate({top: "-58px"});
              up = true;
            }
          } else {
              if(up == true){
                $("#cabecalho").animate({top: "0px"}, 'fast','swing');
                up = false;
              }
          }
          lastScrollTop = st;
        }
      });
    }

    getData.structuralInfo()
      .then(function (data){
        $scope.homePageImage1 = data.data.homePageImage1;
        $scope.homePageImage2 = data.data.homePageImage2;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });


    getData.latestwork()
      .then(function (data){
        $scope.bestprojects = data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    $scope.saveId = function(id){
      saveNewsId.set(id);
    }

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };

  }

})();
