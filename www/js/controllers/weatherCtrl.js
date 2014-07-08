'use strict';

angular.module('zpWeather')
.controller('WeatherCtrl',
    ['$scope', '$cordovaGeolocation', 'weatherService', '$ionicModal', '$timeout',
    function($scope, $cordovaGeolocation, weatherService, $ionicModal, $timeout) {


    $scope.webVersion = '0.1.2';

    // alert('WeatherCtrl');

    $cordovaGeolocation.getCurrentPosition().then(function(position) {
        // alert('get geo');
      // Position here: position.coords.latitude, position.coords.longitude
      // alert('Latitude: '          + position.coords.latitude          + '\n' +
      //   'Longitude: '         + position.coords.longitude         + '\n' +
      //   'Altitude: '          + position.coords.altitude          + '\n' +
      //   'Accuracy: '          + position.coords.accuracy          + '\n' +
      //   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      //   'Heading: '           + position.coords.heading           + '\n' +
      //   'Speed: '             + position.coords.speed             + '\n' +
      //   'Timestamp: '         + position.timestamp                + '\n');

      $scope.lat = position.coords.latitude;
      $scope.lng = position.coords.longitude;
  }, function(err) {
      // error
      alert(err);
  });

  $cordovaGeolocation.watchPosition().then(function() {
      // Not currently used
  }, function(err) {
      // An error occured. Show a message to the user
  }, function(position) {
      // Active updates of the position here
  });


    weatherService.getRealtimeWeather('101130405').then(function(data){
        $scope.realtimeWeatherInfo = data;
    });

    weatherService.getWeeklyWeather('101130405').then(function(data){
        $scope.weeklyWeatherInfo = data;
    });
}]);
