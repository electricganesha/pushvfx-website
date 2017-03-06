(function () {

  angular
    .module('sitePUSH')
    .controller('projectsCtrl', projectsCtrl);

 
  projectsCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function projectsCtrl ($scope, getData, saveNewsId) {
    $scope.twocolumn = false;
    $scope.sixcolumn = false;
    $scope.midPageDiv = false;
    $scope.midPagevideoShow = false;
    $scope.bottomPageDiv = false;

     getData.projectById(saveNewsId.get())
      .then(function (data){
        $scope.showCaseStill = data.data.showCaseStill;
        $scope.showCaseVideo = data.data.showCaseVideo;
        $scope.title = data.data.title;
        $scope.description1 = data.data.description[0];
        $scope.description2 = data.data.description[1];
        if(data.data.stills.length == 2){
          $scope.twocolumn = true;
          $scope.projectstills = data.data.stills;
        }else if(data.data.stills.length == 6){
          $scope.sixcolumn = true;
          $scope.projectstillssix = data.data.stills;
        }
        $scope.credits = data.data.credits;
        if(data.data.midPageStill != ""){
          if(data.data.midPageVideo != ""){
            $scope.midPageDiv = true;
            $scope.midPagevideoShow = true;
            $scope.midPageStill = data.data.midPageStill;
            $scope.midPageVideo = data.data.midPageVideo;
          }else{
            $scope.midPageDiv = true;
            $scope.midPagevideoShow = false;
            $scope.midPageStill = data.data.midPageStill;
          }
        }
        if(data.data.bottomPageStill != "" || data.data.bottomPagetext != ""){
          $scope.bottomPageDiv = true;
          $scope.bottomPageStill = data.data.bottomPageStill;
          $scope.bottomPageText = data.data.bottomPageText;
        }
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