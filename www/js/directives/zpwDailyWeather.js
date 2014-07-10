'use strict';

angular.module('zpWeather')
    .directive('zpwDailyWeather', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'templates/zpw-daily-weather.html',
            scope: {
                index: '=',
                weather: '='
            },
            link: function ($scope, element, attrs) {
//                element.bind('click', function () {
//                    element.html('You clicked me!');
//                });
                var today = new Date();
                $scope.date = today.setDate(today.getDate() + $scope.index);
            }
        }
    });
