(function () {

  angular
    .module('sitePUSH')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function homeCtrl ($scope, getData, saveNewsId) {
    
    var viewportWidth = $(window).width();

   /* $(document).mousemove(function (event) {
        var width1 = event.pageX;
         var width2 = event.pageX;
        var clip1 = "rect(0," + width1 + "px, auto, auto)";
        var clip2 = "rect(0, auto, auto, " + width1 + "px)";
        $("#image2").css('clip', clip1);
        $("#image2").css('clip', clip1);
    });*/

    $(document).mousemove(function (event) {
        var width1 = event.pageX;
        var clip1 = "polygon(0 0, 0 " + width1*1.56 + "px, " + width1*1.56 + "px 0)";
        $("#image1").css('clip-path', clip1);   
    });

    var arrayImg1 = new Array();
    arrayImg1[0] = {"before": "bpa_before.jpg","after":"bpa_after.jpg"};
    arrayImg1[1] = {"before": "burro_before.jpg","after":"burro_after.jpg"};
    arrayImg1[2] = {"before": "dentes_before.jpg","after":"dentes_after.jpg"};
    arrayImg1[3] = {"before": "galo_before.jpg","after":"galo_after.jpg"};
    arrayImg1[4] = {"before": "jac01_before.jpg","after":"jac01_after.jpg"};
    arrayImg1[5] = {"before": "jac02_before.jpg","after":"jac02_after.jpg"};
    arrayImg1[6] = {"before": "porco_before.jpg","after":"porco_after.jpg"};
     arrayImg1[7] = {"before": "wirehead_before.jpg","after":"wirehead_after.jpg"};

    var arrayImg2 = new Array();
    arrayImg2[0] = "still9.jpg";
    arrayImg2[1] = "still10.jpg";
    arrayImg2[2] = "still11.jpg";
    arrayImg2[3] = "still12.jpg";
    arrayImg2[4] = "still13.jpg";
    arrayImg2[5] = "still14.jpg";
    arrayImg2[6] = "still15.jpg";
    arrayImg2[7] = "still16.jpg";


    getRandomImage(arrayImg1, "");
    getRandomImage1(arrayImg2, "");

    function getRandomImage(imgAr, path) {
        path = path || 'https://pushvfx.com/pics/beforeafter/'; // default path here
        var num = Math.floor( Math.random() * imgAr.length );
        var img = imgAr[ num ];
        $scope.before = path + imgAr[ num ].before;
        $scope.after = path + imgAr[ num ].after;
    }

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
