'use strict';

angular.module('zpWeather')
    .directive('zpwWeeklyForecast', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'templates/zpw-weekly-forecast.html',
            scope: {
                forecast: '='
            }
        }
    });
