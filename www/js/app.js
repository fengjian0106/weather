'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('zpWeather', ['ionic', 'ngCordova'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                window.StatusBar.styleDefault();
            }
        });
    })
//    .constant('WEATHER_ICONS', {
//        'partlycloudy': 'ion-ios7-partlysunny-outline',
//        'mostlycloudy': 'ion-ios7-partlysunny-outline',
//        'cloudy': 'ion-ios7-cloudy-outline',
//        'rain': 'ion-ios7-rainy-outline',
//        'tstorms': 'ion-ios7-thunderstorm-outline',
//        'sunny': 'ion-ios7-sunny-outline',
//        'clear-day': 'ion-ios7-sunny-outline',
//        'nt_clear': 'ion-ios7-moon-outline',
//        'clear-night': 'ion-ios7-moon-outline'
//    })
//    .constant('DBK_FOCUS_CITIES', '__db_key_focus_cities')

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/zpw-cities.html",
                controller: 'zpwCitiesCtrl'
            })

            .state('app.weather', {
                url: "/weather",
                views: {
                    'menuContent': {
                        templateUrl: "templates/zpw-weather.html",
                        controller: 'zpwWeatherCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/weather');
    });
