'use strict';

angular.module('zpWeather')
    .controller('zpwCitySelCtrl',
    ['$scope', '$rootScope', '$http', '$timeout', 'zpwFocusCitiesStorage', '$ionicScrollDelegate', '$ionicPopup', '$ionicLoading',
        function ($scope, $rootScope, $http, $timeout, zpwFocusCitiesStorage, $ionicScrollDelegate, $ionicPopup, $ionicLoading) {
            var ionContentHeight = 0;
            $http({
                method: 'get',
                url: 'allCities.json'
            }).success(function (data, status, headers, config) {
                $scope.cities = data.d;
                $scope.getElementIonContentHeight();
            }).error(function (err, status, headers, config) {
                console.log('Error retrieving allCities.json');
            });
            $scope.getElementIonContentHeight = function () {
                ionContentHeight = document.querySelector('.zpw-city-sel-page__ioncontent').clientHeight;
//                console.log("ionContentHeight" + ionContentHeight);
            };
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
                $ionicScrollDelegate.scrollTop();
            };
            $scope.itemClicked = function (index, city) {
                if (zpwFocusCitiesStorage.checkAdded(city)) {//true 已存   false 未存

//                    var customPopup = $ionicPopup.show({
//                        title: city.d2 + "-" + city.d4,
//                        template: "已添加 -- TODO, ",
//                        scope: $scope
//                    });
//                    $timeout(function () {
//                        customPopup.close();
//                    }, 1500);


                    //单例一直存在 ionicLoading
                    $ionicLoading.show({
                        template: city.d2 + "-" + city.d4 + "<br/><br/>已添加",
                        noBackdrop: false,
                        duration: 1000
                    });

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
            $scope.scrollTop = function () {
                $ionicScrollDelegate.scrollTop();
            }
            $scope.closeKeyboard = function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.close();
                }
            };
            /**
             https://github.com/driftyco/ionic-plugins-keyboard   键盘事件 网页文档有描述
             */
            window.addEventListener('native.keyboardshow', keyboardShowHandler);
            window.addEventListener('native.keyboardhide', keyboardHideHandler);
            $scope.removeAllEventListener = function () {
                window.removeEventListener('native.keyboardshow', keyboardShowHandler);
                window.removeEventListener('native.keyboardhide', keyboardHideHandler);
            };

            function keyboardShowHandler(e) {
//                console.log("show " + ionContentHeight + " " + window.innerHeight + " " + window.outerHeight + " " + e.keyboardHeight);
                angular.element(document.querySelector('.zpw-city-sel-page__ioncontent')).css('height', +ionContentHeight - e.keyboardHeight + 'px');
            };

            function keyboardHideHandler(e) {
//                console.log("hide " + ionContentHeight + " " + window.innerHeight + " " + window.outerHeight + " " + e.keyboardHeight);
                angular.element(document.querySelector('.zpw-city-sel-page__ioncontent')).css('height', ionContentHeight + 'px');
            };
        }]);

