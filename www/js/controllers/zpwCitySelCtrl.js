'use strict';

angular.module('zpWeather')
    .controller('zpwCitySelCtrl',
    ['$scope', '$rootScope', '$http', '$timeout', 'zpwFocusCitiesStorage', '$ionicScrollDelegate', '$ionicPopup',
        function ($scope, $rootScope, $http, $timeout, zpwFocusCitiesStorage, $ionicScrollDelegate, $ionicPopup) {
            $http({
                method: 'get',
                url: 'allCities.json'
            }).success(function (data, status, headers, config) {
                $scope.cities = data.d;
            }).error(function (err, status, headers, config) {
                console.log('Error retrieving allCities.json');
            });

            $scope.close = function () {
                $scope.closeKeyboard();
                $scope.removeAllEventListener();
                $rootScope.citySelMoal.remove();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
//                console.log("$destroy");
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
//                console.log("modal.hidden");
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
//                console.log("modal.removed");
            });
            $scope.clearSearchStr = function () {
                $scope.searchStr = '';
            };
            $scope.itemClicked = function (index, city) {
                if (zpwFocusCitiesStorage.checkAdded(city)) {//true 已存   false 未存
                    var customPopup = $ionicPopup.show({
                        title: city.d2 + "-" + city.d4,
                        template: "已添加 -- TODO, ",
                        scope: $scope
                    });
                    $timeout(function () {
                        customPopup.close();
                    }, 1500);
                } else {
                    zpwFocusCitiesStorage.addFocusCity(city);
                    $scope.closeKeyboard();
                    $scope.removeAllEventListener();
                    $rootScope.citySelMoal.remove();
                }
            };
            $scope.getItemHeight = function (city) {
                return 44;
            };
            $scope.getItemWidth = function (city) {
                return '100%';
            };
            $scope.filterCityFunc = function (city) {
                var itemDoesMatch = !$scope.searchStr ||
                    city.d2.indexOf($scope.searchStr) > -1 || city.d3.indexOf($scope.searchStr.toLowerCase()) > -1 || city.d4.indexOf($scope.searchStr) > -1;
                return itemDoesMatch;
            };

            $scope.checkCityAdded = function (city) {
                var citiesAdded = zpwFocusCitiesStorage.getFocusCities();
                /**
                 * 效率问题  有没有一个对象 在另一个数组里包含
                 * http://stackoverflow.com/questions/15610501/in-angular-i-need-to-search-objects-in-an-array
                 * http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
                 * http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array
                 */
                var cityAdded;
                for (var i = 0; i < citiesAdded.length; i++) {
                    cityAdded = citiesAdded[i];
//                    console.log(city.d1 + "...info" + cityAdded.d1);
                    if (city.d1 === cityAdded.d1) {
                        return true;
                    } else {
                        continue;
                    }
                }
                return false;
            };
            $scope.scrollTop = function (){
                $ionicScrollDelegate.scrollTop();
            }
            $scope.closeKeyboard = function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.close();
                }
            };
            /**
            https://github.com/driftyco/ionic-plugins-keyboard
             */
            window.addEventListener('native.keyboardshow', keyboardShowHandler);
            window.addEventListener('native.keyboardhide', keyboardHideHandler);
            $scope.removeAllEventListener = function () {
                window.removeEventListener('native.keyboardshow', keyboardShowHandler);
                window.removeEventListener('native.keyboardhide', keyboardHideHandler);
            };

            var keyboardHeight = 0;

            function keyboardShowHandler(e) {
                var height = document.querySelector('.zpw-city-sel-page__ioncontent').clientHeight;
//                alert("show " +height +window.innerHeight+" "+window.outerHeight+" "+ e.keyboardHeight);
                keyboardHeight = e.keyboardHeight;
                angular.element(document.querySelector('.zpw-city-sel-page__ioncontent')).css('height', height - e.keyboardHeight + 'px');
            };

            function keyboardHideHandler(e) {
                var height = document.querySelector('.zpw-city-sel-page__ioncontent').clientHeight;
//                alert(" hide " + height+" "+window.innerHeight+" "+window.outerHeight+" "+ e.keyboardHeight);
                angular.element(document.querySelector('.zpw-city-sel-page__ioncontent')).css('height', height + keyboardHeight + 'px');
            };
        }]);

