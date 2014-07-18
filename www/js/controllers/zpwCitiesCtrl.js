'use strict';

angular.module('zpWeather')
    .controller('zpwCitiesCtrl',
    ['$scope', '$rootScope', '$ionicModal', '$timeout', 'zpwFocusCitiesStorage', '$state', '$ionicSideMenuDelegate',
        function ($scope, $rootScope, $ionicModal, $timeout, zpwFocusCitiesStorage, $state, $ionicSideMenuDelegate) {
            ///////////////////////////////////////////////////////////
            $scope.focusCities = zpwFocusCitiesStorage.getFocusCities();

            $scope.addCity = function () {
                $ionicModal.fromTemplateUrl('templates/zpw-city-sel.html', {
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $rootScope.citySelMoal = modal;
                    modal.show();
                });
            };

            $scope.cityClicked = function (index) {
                var city = $scope.focusCities[index];
                zpwFocusCitiesStorage.setCurrentCity(city);
                $ionicSideMenuDelegate.toggleLeft(false);
            };


            ///////////////////////////////////////////////////////////Just for test -- fj
            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            },

                // Open the login modal
                $scope.login = function () {
                    $scope.modal.show();
                };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };

            $scope.deleteMode = function () {
               $scope.modal.showDelete = !$scope.modal.showDelete;
            };

            $scope.deleteTitle = function () {
                return ($scope.modal.showDelete?"done":"delete");
            };

            $scope.deleteCity = function (city) {
                zpwFocusCitiesStorage.removeFocusCity(city);
            };
        }]);
