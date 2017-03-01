(function () {

  angular
    .module('sitePUSH')
    .controller('timelineCtrl', timelineCtrl);


  timelineCtrl.$inject = ['$scope', '$compile', 'getData'];
  function timelineCtrl ($scope, $compile, getData) {
    var dates = new Array();
    var yearEvents = [];

    getData.lastSixNews()
      .then(function (data){
        $scope.lastNews = data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    for(var y = 2016; y <= new Date().getFullYear(); y ++){
      getData.newsByYear(y)
        .then(function (data){
          for (i=0; i < data.data.length; i ++){  
            dates[i] = data.data[i].dateOfEvent;
          }
          $scope.News = data;
          yearEvents.push(dates);
          dates = [];
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });
    } 

    $scope.showNew = function(newsdate) {
      getData.newsByDate(newsdate)
        .then(function (data){
          console.log(data);
          $scope.newsByDate = data;
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });
    }

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };

    setTimeout(function(){
      var cont = 0;
      for(a=2016; a <= new Date().getFullYear(); a ++){
        createTimeLine(a);
        createLinks(yearEvents[cont], a);
        cont += 1;
      }

    }, 1000);

    function createLinks(dates, year) {
      for(var i=0; i<dates.length; i++) {
        var aDay = whichDayOfTheYear(dates[i]);
        var link = document.createElement("a");
        link.id="newsLink";
        link.style.width = "5px";
        link.style.height = $("#"+year).height() + "px";
        link.style.backgroundColor = "white";
        link.style.position = "absolute";
        var margin = ((aDay * $("#"+year).width()) / 365) - 4;
        link.style.marginLeft = margin+"px";
        link.style.cursor = "pointer";
        link.setAttribute("ng-click", "showNew('" + dates[i] + "')");
        $compile(link)($scope);
        document.getElementById(year).appendChild(link);
      }
    }

    function whichDayOfTheYear(aDate) {
      thisDate = new Date(aDate);
      var start = new Date(thisDate.getFullYear(), 0, 0);
      var diff = thisDate - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      return day;
    }

    function createTimeLine(year) {
      var timelines = document.getElementById("timeLines");
      var timelinebar = document.createElement("div");
      timelinebar.style.clear = "both";
      timelinebar.style.margin = "auto";
      timelinebar.style.width = "70%";
      timelinebar.style.height = "4vh";
      timelinebar.style.marginTop = "10px";
      if(year%2 == 0){
        timelinebar.style.backgroundColor = "#bb153a";
      }else{
        timelinebar.style.backgroundColor = "#3e2a56";
      }

      var timelineyear = document.createElement("p");
      timelineyear.innerHTML= year;
      timelineyear.style.marginTop= "10px";
      timelineyear.style.paddingLeft= "15px";
      timelineyear.style.width= "9%";
      timelineyear.style.float= "left";
      timelineyear.style.color = "white";
      timelineyear.style.fontFamily = "myriadregular";
      timelineyear.style.fontSize = "17px";
      timelineyear.style.letterSpacing = "1px";

      var timeline = document.createElement("div");
      timeline.id = year;
      //timeline.style.position ="absolute";
      timeline.style.width = "90%";
      timeline.style.float = "right";
      timeline.style.height = "4vh";
      
      timelinebar.appendChild(timelineyear);
      timelinebar.appendChild(timeline);
      timelines.appendChild(timelinebar);
    }
  }

})();
