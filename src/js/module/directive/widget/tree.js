/**=========================================================
 * Module: src/js/module/directive/widget/tree.js
 * tree 指令
 * @author: haili042
 * @time: 2016年4月13日 15:05:42
 =========================================================*/

App

    // 复选框
    .directive('widgetTree', ['$q', '$http', function ($q, $http) {
        return {
            restrict: 'E',
            templateUrl: '/app/tpl/widget/tree.html',
            scope: {
                treeData: '=',
                canChecked: '=',
                textField: '@',
                itemClicked: '&',
                itemCheckedChanged: '&',
                config: '='
            },
            controller: function ($scope) {
                $scope.itemExpended = function (item, $event) {
                    item.$$isExpend = !item.$$isExpend;
                    $event.stopPropagation();
                };
                $scope.isLeaf = function (item) {
                    return !item.children || !item.children.length;
                };
                $scope.warpCallback = function (callback, item, $event) {
                    ($scope[callback] || angular.noop)({
                        $item: item,
                        $event: $event
                    });
                };
            },
            link: function($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {
                    },

                    newConfig = $scope.config, // 传进来的参数
                    deferred = $q.defer(),
                    promise = deferred.promise,
                    queryParams = {}
                    ;

                // jquery 深拷贝
                $scope.config = $.extend(true, {}, defaultConfig, newConfig);


                // 发送请求
                if ($scope.config.url) {

                    $http({
                        method: 'get',
                        url: newConfig.url,
                        //data: {} // post 请求使用, 数据放在, 消息体中
                        params: queryParams // 参数转成字符串放在 url 后面
                    }).success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                }

                // 等待请求返回的数据
                promise.then(function (data) {

                    $scope.treeData = data;
                }, function (data) {

                });

            }
        }
    }])
;