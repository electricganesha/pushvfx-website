(function () {

  angular
    .module('sitePUSH')
    .controller('contactsCtrl', contactsCtrl);



  contactsCtrl.$inject = ['$scope', 'getData','NgMap','$http'];
  function contactsCtrl ($scope, getData,NgMap,$http) {

    $scope.inputNameClass = 'formtb';
    $scope.inputEmailClass = 'formtb';
    $scope.inputSubjectClass = 'formtb';
    $scope.textAreaClass = 'textareaClass';

     NgMap.getMap({id:"pushMap"}).then(function(map) {

			$scope.map = map;

      $scope.map.styles = [
    {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#b8153a"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "gamma": "10.00"
              },
              {
                  "lightness": "100"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              },
              {
                  "lightness": 45
              },
              {
                  "hue": "#ff0000"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ff0000"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#3e2a56"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "saturation": "100"
              },
              {
                  "gamma": "6.51"
              },
              {
                  "weight": "5.00"
              },
              {
                  "color": "#d0cdcd"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#3e2a56"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#e5e5e5"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#eae9e9"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#b8153a"
              },
              {
                  "saturation": "-10"
              },
              {
                  "lightness": "24"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#e5e3e3"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ececec"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#b8153a"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "color": "#b8153a"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#a7a7a7"
              },
              {
                  "visibility": "on"
              }
          ]
      }
	];

       $scope.map.setOptions({styles: $scope.map.styles});
	});

    $scope.submitContactForm = function()
    {

      formIsValid = false;

      var data = ({
        contactName : $scope.nameContact,
        contactEmail : $scope.emailContact,
        contactSubject : $scope.subjectContact,
        contactMessage : $scope.messageContact
      });

      if(!$scope.nameContact || $scope.nameContact === '') { $scope.inputNameClass = 'formtbError'; formIsValid = false;  }
      else if($scope.nameContact || $scope.nameContact != '') { $scope.inputNameClass = 'formtb';  }

      if(!$scope.emailContact || $scope.emailContact === '') { $scope.inputEmailClass = 'formtbError'; formIsValid = false;  }
      else if($scope.emailContact || $scope.emailContact != '') { $scope.inputEmailClass = 'formtb';  }

      if(!$scope.subjectContact || $scope.subjectContact === '') { $scope.inputSubjectClass = 'formtbError'; formIsValid = false; }
      else if($scope.subjectContact || $scope.subjectContact != '') { $scope.inputSubjectClass = 'formtb';  }

      if(!$scope.messageContact || $scope.messageContact === '') { $scope.textAreaClass = 'textareaClassError'; formIsValid = false; }
      else if($scope.messageContact || $scope.messageContact != '') { $scope.textAreaClass = 'textareaClass';  }

      if($scope.nameContact &&  $scope.emailContact && $scope.messageContact && $scope.subjectContact)
        formIsValid = true;

      if(formIsValid){

      // Simple POST request example (passing data) :
            $http.post('/api/mailerservice', data).
                then(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //clean form
                    $scope.nameContact = '';
                    $scope.emailContact = '';
                    $scope.messageContact = '';
                    $scope.subjectContact = '';
                    currentDate = '';
                    $scope.newContactForm.$setPristine();
                }).
                catch(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("EMAIL WAS NOT SENT - ERROR "+status);
                });
    }

    }

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };
  }

})();
