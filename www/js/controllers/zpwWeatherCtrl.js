'use strict';

angular.module('zpWeather')
    .controller('ZpwWeatherCtrl',
    ['$scope', '$cordovaGeolocation', 'zpwWeatherService', '$ionicModal', '$timeout',
        function ($scope, $cordovaGeolocation, zpwWeatherService, $ionicModal, $timeout) {


            $scope.webVersion = '0.1.2';


            $cordovaGeolocation.getCurrentPosition().then(function (position) {
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
            }, function (err) {
                // error
                alert(err);
            });

            $cordovaGeolocation.watchPosition().then(function () {
                // Not currently used
            }, function (err) {
                // An error occured. Show a message to the user
            }, function (position) {
                // Active updates of the position here
            });

            /////////
            $scope.todayDate = new Date();
            console.log($scope.todayDate);

            zpwWeatherService.getRealtimeWeather('101280101').then(function (data) {
                $scope.realtimeWeatherInfo = data;
            });

            zpwWeatherService.getTodayWeather('101280101').then(function (data) {
                $scope.todayWeatherInfo = data;
            });

            zpwWeatherService.getWeeklyWeather('101280101').then(function (data) {
                $scope.weeklyWeatherInfo = data;
            });


            $scope.doRefresh = function () {
                zpwWeatherService.getRealtimeWeather('101280101').then(function (data) {
                    $scope.realtimeWeatherInfo = data;
                }).then(function () {
                    zpwWeatherService.getTodayWeather('101280101').then(function (data) {
                        $scope.todayWeatherInfo = data;
                    });
                }).then(function () {
                    zpwWeatherService.getWeeklyWeather('101280101').then(function (data) {
                        $scope.weeklyWeatherInfo = data;
                    });
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };


            // Delay so we are in the DOM and can calculate sizes
            $timeout(function () {
                var windowHeight = window.innerHeight,
                    navBarHeight = document.querySelector('.zpw-side-menu__nav-bar').offsetHeight,
                    /**
                     *  纯技术角度来看，weatherInfoH的值，应该就用代码动态查询出来，但是这个需要timeout延迟一段时间后，才能获取到真正的非零值，
                     所以这里用一点magic code，用代码直接写出这个高度值，而且这个高度值，是在_zpw-weather-page.scss中预设好的
                     weatherInfoH = document.querySelector('.zpw-weather-page__content__weather-info').offsetHeight,
                     * */
                    weatherInfoH = 85 + 130,
                    marginTop = windowHeight - navBarHeight - weatherInfoH;

                angular.element(document.querySelector('.zpw-weather-page__content__weather-info')).css('padding-top', marginTop + 'px');
            });
        }]);
