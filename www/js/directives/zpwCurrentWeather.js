'use strict';

angular.module('zpWeather')
    .directive('zpwCurrentWeather', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/zpw-current-weather.html',
            scope: {
                realtimeWeather: '=',
                todayWeather: '=',
                date: '='
            }
        }
    });
