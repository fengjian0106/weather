'use strict';

angular.module('zpWeather')
    .controller('zpwWeatherCtrl',
    ['$scope', '$stateParams', '$q', '$cordovaGeolocation', 'zpwWeatherService', '$ionicModal', '$timeout', 'zpwFocusCitiesStorage',
        function ($scope, $stateParams, $q, $cordovaGeolocation, zpwWeatherService, $ionicModal, $timeout, zpwFocusCitiesStorage) {
            $scope.doRefresh = function () {
                var rtwPromise, twPromise, wwPromise;

                rtwPromise = zpwWeatherService.getRealtimeWeather($scope.currentCity.d1);
                twPromise = zpwWeatherService.getTodayWeather($scope.currentCity.d1);
                wwPromise = zpwWeatherService.getWeeklyWeather($scope.currentCity.d1);

                $q.all([rtwPromise, twPromise, wwPromise]).then(function success(data) {
                    //<1>
                    $scope.realtimeWeatherInfo = data[0];

                    //<2>
                    $scope.todayWeatherInfo = data[1];

                    //http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
                    String.prototype.paddingLeft = function (paddingValue) {
                        return String(paddingValue + this).slice(-paddingValue.length);
                    };
                    $scope.todayWeatherInfo.onlineImg = 'http://mobile.weather.com.cn/images/day/' + $scope.todayWeatherInfo.img1.replace('d', '').replace('n', '').replace('.gif', '').paddingLeft('00') + '.png';

                    //<3>
                    $scope.weeklyWeatherInfo = data[2];

                    //fixbug 缺少当天最高气温和天气图标
                    var curDayWeather = data[2][0];
                    if (curDayWeather !== null && (curDayWeather.fa === "" || curDayWeather.fc === "")) {
                        curDayWeather.fc = $scope.todayWeatherInfo.temp2;
                        var index = curDayWeather.fc.indexOf("℃");
                        if (index !== -1) {
                            curDayWeather.fc = curDayWeather.fc.slice(0, index);
                        }
                        curDayWeather.fa = $scope.todayWeatherInfo.img1;
                    }

                }).catch(function error(err) {
                    console.error(err);
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });


//                 被注释掉的这段代码，是按照chain的风格调用3个http api的，而上面的代码，是按照Parallel的风格并行执行3个http api请求的
                /*zpwWeatherService.getRealtimeWeather($scope.currentCity.d1).then(function success(data0) {
                 $scope.realtimeWeatherInfo = data0;

                 return zpwWeatherService.getTodayWeather($scope.currentCity.d1);
                 }).then(function success(data1) {
                 $scope.todayWeatherInfo = data1;

                 //http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
                 String.prototype.paddingLeft = function (paddingValue) {
                 return String(paddingValue + this).slice(-paddingValue.length);
                 };
                 $scope.todayWeatherInfo.onlineImg = 'http://mobile.weather.com.cn/images/day/' + $scope.todayWeatherInfo.img1.replace('d', '').replace('n', '').replace('.gif', '').paddingLeft('00') + '.png';

                 return zpwWeatherService.getWeeklyWeather($scope.currentCity.d1);
                 }).then(function success(data2) {
                 $scope.weeklyWeatherInfo = data2;

                 //fixbug 缺少当天最高气温和天气图标
                 var curDayWeather = data2[0];
                 if (curDayWeather !== null && (curDayWeather.fa === "" || curDayWeather.fc === "")) {
                 curDayWeather.fa = $scope.todayWeatherInfo.img1;
                 curDayWeather.fc = $scope.todayWeatherInfo.temp2;
                 var index = curDayWeather.fc.indexOf("℃");
                 if (index !== -1) {
                 curDayWeather.fc = curDayWeather.fc.slice(0, index);
                 }
                 }

                 }).catch(function error(err) {
                 console.info(err);
                 }).finally(function () {
                 // Stop the ion-refresher from spinning
                 $scope.$broadcast('scroll.refreshComplete');*/
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



        }]);
