/**=========================================================
 * Module: src/js/module/directive/table.js
 * table 组件指令
 * @author: haili042
 * @time: 2016年4月11日 20:11:38
 =========================================================*/

App
    .directive('widgetTable', function () {
        return {
            restrict: 'EC',
            scope: {
                config: '='
            },
            transclude: true,
            templateUrl: '/app/tpl/widget/table.html',
            controller: function ($scope, $q, $http) {

                // 默认参数
                var defaultConfig = {
                        checkbox: true
                    },

                    newConfig = $scope.config, // 传进来的参数
                    deferred = $q.defer(),
                    promise = deferred.promise
                    ;

                // 发送请求
                $http({
                    method: 'get',
                    url: newConfig.url
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });

                // 等待请求返回的数据
                promise.then(function (data) {
                    $scope.config.data = data;
                    // jquery 深拷贝
                    $scope.config = $.extend(true, {}, defaultConfig, newConfig);
                }, function (data) {

                });

            }
        };
    })
;