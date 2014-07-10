'use strict';
/**
 * http://jsfiddle.net/vkarpov15/NE9cu/
 * */
angular.module('zpWeather')
    .directive('zpwBackgroundImage', function () {
        return function (scope, element, attrs) {
            element.css({
                'background-image': 'url(' + attrs.zpwBackgroundImage + ')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            });
        };
    });
