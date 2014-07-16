'use strict';

angular.module('zpWeather')
    .controller('zpwWeatherCtrl',
    ['$scope', '$stateParams', '$cordovaGeolocation', 'zpwWeatherService', '$ionicModal', '$timeout', 'zpwFocusCitiesStorage',
        function ($scope, $stateParams, $cordovaGeolocation, zpwWeatherService, $ionicModal, $timeout, zpwFocusCitiesStorage) {
            $scope.doRefresh = function () {
                zpwWeatherService.getRealtimeWeather($scope.currentCity.d1).then(function (data) {
                    $scope.realtimeWeatherInfo = data;
                }).then(function () {
                    zpwWeatherService.getTodayWeather($scope.currentCity.d1).then(function (data) {
                        $scope.todayWeatherInfo = data;


                        //http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
                        String.prototype.paddingLeft = function (paddingValue) {
                            return String(paddingValue + this).slice(-paddingValue.length);
                        };
                        $scope.todayWeatherInfo.onlineImg = 'http://mobile.weather.com.cn/images/day/' + $scope.todayWeatherInfo.img1.replace('d', '').replace('.gif', '').paddingLeft('00') + '.png';
                    });
                }).then(function () {
                    zpwWeatherService.getWeeklyWeather($scope.currentCity.d1).then(function (data) {
                        $scope.weeklyWeatherInfo = data;
                    });
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            /////////
            $scope.todayDate = new Date();
            console.log($scope.todayDate);

            $scope.currentCity = zpwFocusCitiesStorage.getCurrentCity();
            if ($scope.currentCity !== null) {
                $scope.doRefresh();
            }

            $scope.$on('zpw.currentCity.updated', function (event, city) {
                $scope.currentCity = city;
                if ($scope.currentCity !== null) {
                    $scope.doRefresh();
                }
            });


//            $scope.webVersion = '0.1.2';


            /**
             *
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
             * */








                // Delay so we are in the DOM and can calculate sizes
            $timeout(function () {
                var windowHeight = window.innerHeight,
                    navBarHeight = document.querySelector('.zpw-side-menu__nav-bar').offsetHeight,
                    /**
                     *  纯技术角度来看，weatherInfoH的值，应该就用代码动态查询出来，但是这个需要timeout延迟一段时间后，才能获取到真正的非零值，
                     所以这里用一点magic code，用代码直接写出这个高度值，而且这个高度值，是在_zpw-weather-page.scss中预设好的
                     weatherInfoH = document.querySelector('.zpw-weather-page__content__weather-info').offsetHeight,
                     * */
                    weatherInfoH = 105 + 130,
                    marginTop = windowHeight - navBarHeight - weatherInfoH;

                angular.element(document.querySelector('.zpw-weather-page__content__weather-info')).css('padding-top', marginTop + 'px');
            });
        }]);
