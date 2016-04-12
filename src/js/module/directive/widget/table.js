/**=========================================================
 * Module: src/js/module/directive/table.js
 * table 组件指令
 * @author: haili042
 * @time: 2016年4月11日 20:11:38
 =========================================================*/

App
    .directive('widgetTable', ['$q', '$http', function ($q, $http) {
        return {
            restrict: 'EA',
            scope: {
                config: '='
            },
            replace: true,
            transclude: true,
            templateUrl: '/app/tpl/widget/table.html',
            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {
                        checkbox: true,
                        border: false,
                        pagination: false, // 默认不展示
                        pageNumber: 1,
                        pageSize: 20,
                        pageList: [10,20,30,40],
                        sortName: 'id',
                        sortOrder: 'asc'
                    },

                    newConfig = $scope.config, // 传进来的参数
                    deferred = $q.defer(),
                    promise = deferred.promise,
                    queryParams = {}
                    ;

                // jquery 深拷贝
                $scope.config = $.extend(true, {}, defaultConfig, newConfig);
                queryParams = $scope.config.queryParams;
                queryParams.pageNumber = $scope.config.pageNumber;
                queryParams.pageSize = $scope.config.pageSize;
                queryParams.sortName = $scope.config.sortName;
                queryParams.sortOrder = $scope.config.sortOrder;


                // 发送请求
                $http({
                    method: 'get',
                    url: newConfig.url,
                    //data: {} // post 请求使用, 数据放在, 消息体中
                    data: queryParams,
                    params: queryParams // 参数转成字符串放在 url 后面
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });

                // 等待请求返回的数据
                promise.then(function (data) {
                    $scope.config.data = data;
                }, function (data) {

                });


                // 事件绑定
                // --------------------
                $scope.selectAll = function () {
                    $scope.$broadcast('event:selectAll');
                };

            }
        };
    }])

    .directive('widgetTablePagination', function () {
        return {
            restrict: 'EA',
            require: '^WidgetTable',

            link: function ($scope, $elem, $attr) {

            }
        };
    })
;