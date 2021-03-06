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

            /**
             * 获取实时天气信息，使用 http://www.weather.com.cn/data/sk/101280101.html
             * http api 返回的json如下
             *
             * {
                    "weatherinfo": {
                        "city": "广州",
                        "cityid": "101280101",
                        "temp": "33",
                        "WD": "东风",
                        "WS": "1级",
                        "SD": "63%",
                        "WSE": "1",
                        "time": "11:40",
                        "isRadar": "1",
                        "Radar": "JC_RADAR_AZ9200_JB"
                    }
                }
             *
             *
             * getRealtimeWeather 返回的json如下
             *
             {
                 "city": "广州",
                 "cityid": "101280101",
                 "temp": "33",
                 "WD": "东风",
                 "WS": "1级",
                 "SD": "63%",
                 "WSE": "1",
                 "time": "11:40",
                 "isRadar": "1",
                 "Radar": "JC_RADAR_AZ9200_JB"
             }
             *
             *
             * */
            function getRealtimeWeather(cityCode) {
                var deferred = $q.defer();

                $http.jsonp('http://query.yahooapis.com/v1/public/yql?', {
                    params: {
                        q: 'select * from json where url="http://www.weather.com.cn/data/sk/' + cityCode + '.html"',
                        format: 'json',
                        callback: 'JSON_CALLBACK'
                    }
                }).success(function (data, status, headers, config) {
                    console.info(data);
                    deferred.resolve(data.query.results.weatherinfo);
                }).error(function (err, status, headers, config) {
                    console.log('Error retrieving RealtimeWeather');
                    deferred.reject(err);
                });

                return deferred.promise;
            }


            /**
             * 获取当天的天气信息，有最低气温和最高气温，使用 http://www.weather.com.cn/data/cityinfo/101280101.html
             * http api 返回的json如下
             *
             {
                "weatherinfo": {
                    "city": "广州",
                    "cityid": "101280101",
                    "temp1": "35℃",
                    "temp2": "26℃",
                    "weather": "多云",
                    "img1": "d1.gif",
                    "img2": "n1.gif",
                    "ptime": "11:00"
                }
             }
             *
             *
             * getTodayWeather 返回的json如下
             *
             {
                        "city": "广州",
                        "cityid": "101280101",
                        "temp1": "35℃",
                        "temp2": "26℃",
                        "weather": "多云",
                        "img1": "d1.gif",
                        "img2": "n1.gif",
                        "ptime": "11:00"
             }
             *
             *
             * */
            function getTodayWeather(cityCode) {
                var deferred = $q.defer();

                $http.jsonp('http://query.yahooapis.com/v1/public/yql?', {
                    params: {
                        q: 'select * from json where url="http://www.weather.com.cn/data/cityinfo/' + cityCode + '.html"',
                        format: 'json',
                        callback: 'JSON_CALLBACK'
                    }
                }).success(function (data, status, headers, config) {
                    console.info(data);
                    deferred.resolve(data.query.results.weatherinfo);
                }).error(function (err, status, headers, config) {
                    console.log('Error retrieving todayWeather');
                    deferred.reject(err);
                });

                return deferred.promise;
            }


            function getWeeklyWeather(cityCode) {
                var deferred = $q.defer(),
                    ct = (new Date()).getTime();

                $http.jsonp('http://query.yahooapis.com/v1/public/yql?', {
                    params: {
                        //这里使用的是ip地址，而不是域名。使用域名的时候，server端会返回一个错误的日期对应的天气信息，抓包分析过，
                        //用域名的时候，设置一个header字段也可以得到正确的信息，但是在yql的基础上，设置header，很麻烦，而且也需要一台额外的server。
                        //后来发现用ip地址，就没有这个问题
                        q: 'select * from json where url="http://61.4.184.52/data/forecast/' + cityCode + '.html?_=' + ct + '"',
                        format: 'json',//fuck，这个参数，会让返回的数据再被封装一层，最外层是的key是json，WTF
                        callback: 'JSON_CALLBACK'
                    }
                }).success(function (data, status, headers, config) {
                    console.info(data)
                    deferred.resolve(data.query.results.json.f.f1);// this is a array
                }).error(function (err, status, headers, config) {
                    console.log('Error retrieving WeeklyWeather');
                    console.info(status);
                    deferred.reject(err);
                });

                return deferred.promise;
            }


            return {
                getRealtimeWeather: getRealtimeWeather,
                getTodayWeather: getTodayWeather,
                getWeeklyWeather: getWeeklyWeather
            };
        }]);
