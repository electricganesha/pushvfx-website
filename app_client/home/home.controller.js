(function () {

  angular
    .module('sitePUSH')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'getData'];
  function homeCtrl ($scope, getData) {
    $scope.image1show = false;
    var viewportWidth = $(window).width();
    var path = 'https://pushvfx.com/pics/beforeafter/';
    $scope.id = 1;
    $scope.before = path + "01_before.jpg";
    $scope.after = path + "01_after.jpg";

    $scope.clipimage = function($event){
        $scope.image1show = true;
        var width1 = $event.x;
        var clip1 = "polygon(0 0, 0 " + width1*1.56 + "px, " + width1*1.56 + "px 0)";
        $("#image1").css('clip-path', clip1);
    }

    $('#toucharea').bind('touchmove', function (e) {
        e.preventDefault();
        $scope.image1show = true;
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var width1 = touch.pageX;
        var clip1 = "polygon(0 0, 0 " + width1*1.56 + "px, " + width1*1.56 + "px 0)";
        $("#image1").css('clip-path', clip1);
    });

    $scope.changeproject = function(id){
      console.log("entrei");
      console.log(id);
      switch(id){
        case 1:
          $scope.id = 1;
          $scope.before = path + "01_before.jpg";
          $scope.after = path + "01_after.jpg";
          break;
        case 2:
          $scope.id = 2;
          $scope.before = path + "burro_before.jpg";
          $scope.after = path + "burro_after.jpg";
          break;
        case 3:
          $scope.id = 3;
          $scope.before = path + "dentes_before.jpg";
          $scope.after = path + "dentes_after.jpg";
          break;
        case 4:
          $scope.id = 4;
          $scope.before = path + "galo_before.jpg";
          $scope.after = path + "galo_after.jpg";
          break;
        case 5:
          $scope.id = 5;
          $scope.before = path + "jac01_before.jpg";
          $scope.after = path + "jac01_after.jpg";
          break;
        case 6:
          $scope.id = 6;
          $scope.before = path + "jac02_before.jpg";
          $scope.after = path + "jac02_after.jpg";
          break;
        case 7:
          $scope.id = 7;
          $scope.before = path + "porco_before.jpg";
          $scope.after = path + "porco_after.jpg";
          break;
        case 8:
          $scope.id = 8;
          $scope.before = path + "wirehead_before.jpg";
          $scope.after = path + "wirehead_after.jpg";
          break;
      }
    }

    var arrayImg2 = new Array();
    arrayImg2[0] = "still9.jpg";
    arrayImg2[1] = "still10.jpg";
    arrayImg2[2] = "still11.jpg";
    arrayImg2[3] = "still12.jpg";
    arrayImg2[4] = "still13.jpg";
    arrayImg2[5] = "still14.jpg";
    arrayImg2[6] = "still15.jpg";
    arrayImg2[7] = "still16.jpg";

    getRandomImage1(arrayImg2, "");

    function getRandomImage1(imgAr, path) {
        path = path || 'https://pushvfx.com/pics/stills/'; // default path here
        var num = Math.floor( Math.random() * imgAr.length );
        var img = imgAr[ num ];
        $scope.mainStill2 = path + img;
    }

    var lastScrollTop = 0;
    var up = false;


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

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };

  }

})();
