'use strict';


angular.module('zpWeather')
    .factory('zpwFocusCitiesStorage', function ($rootScope) {
        /**
         * use these to delete the item
         *
         localStorage.removeItem('focous_cities_id');
         localStorage.removeItem('current_city_id');
         *
         * */

        var FOCUS_CITIES_ID = 'focous_cities_id',
            CURRENT_CITY_ID = 'current_city_id',
            focusCities = JSON.parse(localStorage.getItem(FOCUS_CITIES_ID) || '[]'),
            currentCity = JSON.parse(localStorage.getItem(CURRENT_CITY_ID)) || null;//TODO, how to handle json null ??

        var _setCurrentCity = function (city) {
            currentCity = city;
            localStorage.setItem(CURRENT_CITY_ID, JSON.stringify(currentCity));
            $rootScope.$broadcast('zpw.currentCity.updated', currentCity);
            console.info(currentCity);
        };

        return {
            getFocusCities: function () {
                return focusCities;
            },

            addFocusCity: function (city) {
                focusCities.push(city);
                localStorage.setItem(FOCUS_CITIES_ID, JSON.stringify(focusCities));

                if (focusCities.length === 1) {

                    _setCurrentCity(city);
                }
            },

            getCurrentCity: function () {
                return currentCity;
            },

            checkAdded: function (city) {
                var cityAdded;
                var citiesAdded = this.getFocusCities();
                for (var i = 0; i < citiesAdded.length; i++) {
                    cityAdded = citiesAdded[i];
                    if (city.d1 === cityAdded.d1) {
                        return true;
                    } else {
                        continue;
                    }
                    return false;
                }
            },
            setCurrentCity: _setCurrentCity
        };
    });