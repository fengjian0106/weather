'use strict';

angular.module('zpWeather')
    .factory('zpwWeatherService',
    ['$http', '$q',
        function ($http, $q) {

            //     function getRealtimeWeather (cityCode) {
            //         var deferred = $q.defer();
            //
            //         // $http.get('http://mobile.weather.com.cn/data/sk/' + cityCode + '.html')
            //         $http.get('http://www.shayiming.cn/json/weather.php?city=' + cityCode + '&jsonp=callback')
            //         // $http.get('http://api.openweathermap.org/data/2.5/weather?q=guangzhou')
            //             .success(function(data){
            //                 alert(data);
            //                 deferred.resolve(data.weatherinfo);
            //             })
            //             .error(function(err){
            //                 console.log('Error retrieving RealtimeWeather');
            //                 deferred.reject(err);
            //         });
            //         return deferred.promise;
            //   }

            /**
             http://mobile.weather.com.cn/data/sk/101130405.html存在跨域问题，web不能直接获取，一种方案就是自己再搭个简单的proxy server，中转数据，同时支持cors。另一种方案，就是找个在线的代理类的server，目前用的就是yahoo的yql服务。
             参考http://blog.csdn.net/biany2/article/details/26337933
             和https://github.com/mjhea0/yql-weather/blob/master/app/app.js
             */
            function getRealtimeWeather(cityCode) {
                var deferred = $q.defer();

                $http.jsonp('http://query.yahooapis.com/v1/public/yql?', {
                    params: {
                        q: 'select * from json where url="http://www.weather.com.cn/data/cityinfo/' + cityCode + '.html"',
                        format: 'json',
                        callback: 'JSON_CALLBACK'
                    }
                })
                    .success(function (data, status, headers, config) {
                        console.info(data)
                        deferred.resolve(data.query.results.weatherinfo);
                    })
                    .error(function (err, status, headers, config) {
                        console.log('Error retrieving RealtimeWeather');
                        deferred.reject(err);
                    });

                return deferred.promise;

                /**
                 example result

                 {
                     weatherinfo: {
                         city: "太仓",
                         cityid: "101190408",
                         temp1: "23℃",
                         temp2: "30℃",
                         weather: "阴",
                         img1: "n2.gif",
                         img2: "d2.gif",
                         ptime: "18:00"
                     }
                 }
                 */
            }


            function getWeeklyWeather(cityCode) {
                var deferred = $q.defer();

                $http.jsonp('http://query.yahooapis.com/v1/public/yql?', {
                    params: {
                        q: 'select * from json where url="http://mobile.weather.com.cn/data/forecast/' + cityCode + '.html"',
                        format: 'json',
                        callback: 'JSON_CALLBACK'
                    }
                })
                    .success(function (data, status, headers, config) {
                        console.info(data)
                        deferred.resolve(data.query.results);
                    })
                    .error(function (err, status, headers, config) {
                        console.log('Error retrieving RealtimeWeather');
                        deferred.reject(err);
                    });

                return deferred.promise;
            }


            return {
                getRealtimeWeather: getRealtimeWeather,
                getWeeklyWeather: getWeeklyWeather
            };
        }]);
