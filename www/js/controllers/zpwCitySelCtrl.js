'use strict';

angular.module('zpWeather')
    .controller('zpwCitySelCtrl',
    ['$scope', '$rootScope', '$http', '$timeout', 'zpwFocusCitiesStorage',
        function ($scope, $rootScope, $http, $timeout, zpwFocusCitiesStorage) {
            $http({
                method: 'get',
                url: 'allCities.json'
            }).success(function (data, status, headers, config) {
                $scope.cities = data.d;
            }).error(function (err, status, headers, config) {
                console.log('Error retrieving allCities.json');
            });


            $scope.close = function () {
                $rootScope.citySelMoal.hide();
            };

            $scope.itemClicked = function (index) {
                var city = $scope.cities[index];
                zpwFocusCitiesStorage.addFocusCity(city);

                $rootScope.citySelMoal.hide();
            };


            $scope.getItemHeight = function (city) {
                return 44;
            };
            $scope.getItemWidth = function (city) {
                return '100%';
            };
        }]);
