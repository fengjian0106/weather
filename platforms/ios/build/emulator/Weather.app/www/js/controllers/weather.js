'use strict';

// (function () {
//
//     WeatherCtrl.$inject = ['$scope', '$cordovaGeolocation', '$ionicModal', '$timeout'];
//
// function WeatherCtrl($scope, $cordovaGeolocation, $ionicModal, $timeout) {
//     $scope.webVersion = '0.1.2';
//
//     // alert('WeatherCtrl');
//
//     $cordovaGeolocation.getCurrentPosition().then(function(position) {
//         // Position here: position.coords.latitude, position.coords.longitude
//         // alert('Latitude: '          + position.coords.latitude          + '\n' +
//         //   'Longitude: '         + position.coords.longitude         + '\n' +
//         //   'Altitude: '          + position.coords.altitude          + '\n' +
//         //   'Accuracy: '          + position.coords.accuracy          + '\n' +
//         //   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//         //   'Heading: '           + position.coords.heading           + '\n' +
//         //   'Speed: '             + position.coords.speed             + '\n' +
//         //   'Timestamp: '         + position.timestamp                + '\n');
//
//         $scope.lat = position.coords.latitude;
//         $scope.lng = position.coords.longitude;
//     }, function(err) {
//         // error
//     });
//
//     $cordovaGeolocation.watchPosition().then(function() {
//         // Not currently used
//     }, function(err) {
//         // An error occured. Show a message to the user
//     }, function(position) {
//         // Active updates of the position here
//     });
//
//
//         // $scope.device = $cordovaDevice.getDevice();
//         // $scope.cordova = $cordovaDevice.getCordova();
//         // $scope.model = $cordovaDevice.getModel();
//         // $scope.platform = $cordovaDevice.getPlatform();
//         // $scope.uuid = $cordovaDevice.getUUID();
//         // $scope.version = $cordovaDevice.getVersion();
//         //
//         // alert($scope.version);
//
//     //   // Form data for the login modal
//     //   $scope.loginData = {};
//       //
//     //   // Create the login modal that we will use later
//     //   $ionicModal.fromTemplateUrl('templates/login.html', {
//     //     scope: $scope
//     //   }).then(function(modal) {
//     //     $scope.modal = modal;
//     //   });
//       //
//     //   // Triggered in the login modal to close it
//     //   $scope.closeLogin = function() {
//     //     $scope.modal.hide();
//     //   },
//       //
//     //   // Open the login modal
//     //   $scope.login = function() {
//     //     $scope.modal.show();
//     //   };
//       //
//     //   // Perform the login action when the user submits the login form
//     //   $scope.doLogin = function() {
//     //     console.log('Doing login', $scope.loginData);
//       //
//     //     // Simulate a login delay. Remove this and replace with your login
//     //     // code if using a login system
//     //     $timeout(function() {
//     //       $scope.closeLogin();
//     //     }, 1000);
//     //   };
//
//
//
//
//         // $cordovaStatusbar.hide();
//     }
//
//     angular.module('starter.controllers')
//     .controller('WeatherCtrl', WeatherCtrl);
//
// }());


angular.module('zpWeather')
.controller('WeatherCtrl',
    ['$scope', '$cordovaGeolocation', '$ionicModal', '$timeout',
    function($scope, $cordovaGeolocation, $ionicModal, $timeout) {


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
}]);
