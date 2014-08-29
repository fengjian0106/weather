'use strict';

angular.module('zpWeather')
/**
 *
 *定义天气类型
 var weatherArr = {"00": "晴",
    "01": "多云",
    "02": "阴",
    "03": "阵雨",
    "04": "雷阵雨",
    "05": "雷阵雨伴有冰雹",
    "06": "雨夹雪",
    "07": "小雨",
    "08": "中雨",
    "09": "大雨",
    "10": "暴雨",
    "11": "大暴雨",
    "12": "特大暴雨",
    "13": "阵雪",
    "14": "小雪",
    "15": "中雪",
    "16": "大雪",
    "17": "暴雪",
    "18": "雾",
    "19": "冻雨",
    "20": "沙尘暴",
    "21": "小到中雨",
    "22": "中到大雨",
    "23": "大到暴雨",
    "24": "暴雨到大暴雨",
    "25": "大暴雨到特大暴雨",
    "26": "小到中雪",
    "27": "中到大雪",
    "28": "大到暴雪",
    "29": "浮尘",
    "30": "扬沙",
    "31": "强沙尘暴",
    "53": "霾",
    "99": ""};
 * */

    .constant('ZPW_WEATHER_ICONS', {
        '01': 'weather-few',
        '02': 'weather-broken',
        '03': 'weather-rain',
        '04': 'weather-tstorm',
        '05': 'weather-tstorm',
        '06': 'weather-shower',
        '07': 'weather-shower',
        '08': 'weather-shower',
        '09': 'weather-shower',
        '10': 'weather-shower',
        '11': 'weather-shower',
        '12': 'weather-shower',
        '13': 'weather-snow',
        '14': 'weather-snow',
        '15': 'weather-snow',
        '16': 'weather-snow',
        '17': 'weather-snow',
        '18': 'weather-mist',

        '19': 'weather-shower',
        '20': 'weather-broken',

        '21': 'weather-shower',
        '22': 'weather-shower',
        '23': 'weather-shower',
        '24': 'weather-shower',
        '25': 'weather-shower',

        '26': 'weather-snow',
        '27': 'weather-snow',
        '28': 'weather-snow'

    })
    .directive('zpwWeatherIcon', function (ZPW_WEATHER_ICONS) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                iconIndexStr: '@'
            },
            template: '<div class="zpw-weather-icon" style="background-image: url(img/{{iconName}}.png);"></div>',
            link: function ($scope) {

                $scope.$watch('iconIndexStr', function (v) {
                    if (!v) {
                        return;
                    }

                    var icon = v;
                    console.log(icon);
//                    alert('--' + icon);

                    if (icon in ZPW_WEATHER_ICONS) {
                        $scope.iconName = ZPW_WEATHER_ICONS[$scope.iconIndexStr];
                    } else {
                        $scope.iconName = ZPW_WEATHER_ICONS['01'];
                    }
                });
            }
        }
    });
