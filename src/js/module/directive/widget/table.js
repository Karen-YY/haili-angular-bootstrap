/**=========================================================
 * Module: src/js/module/directive/table.js
 * table 组件指令
 * @author: haili042
 * @time: 2016年4月11日 20:11:38
 =========================================================*/

App
    .directive('widgetTable', ['widgetService', function (widgetService) {
        return {
            restrict: 'EA',
            scope: {
                config: '='
            },
            transclude: true,
            templateUrl: '/app/tpl/widget/table.html',
            controller: function ($scope, $rootScope) {

            },
            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {
                        checkbox: true,
                        border: false,
                        pagination: false, // 默认不展示
                        pageNumber: 1,
                        pageSize: 20,
                        pageList: [10, 20, 30, 40],
                        sortName: 'id',
                        sortOrder: 'asc'
                    },
                    newConfig = $scope.config, // 传进来的参数
                    queryParams = {}
                    ;

                // jquery 深拷贝
                $scope.config = $.extend(true, {}, defaultConfig, newConfig);
                queryParams = $scope.config.queryParams;
                queryParams.pageNumber = $scope.config.pageNumber;
                queryParams.pageSize = $scope.config.pageSize;
                queryParams.sortName = $scope.config.sortName;
                queryParams.sortOrder = $scope.config.sortOrder;


                // 转移指令属性到目标元素
                widgetService.transferAttr($elem, $elem.find('table.widget-table'), $attr, 'class');

                // 等待请求返回的数据
                widgetService
                    .setConfig(defaultConfig, newConfig)
                    .getData(function (data) {
                        $scope.config.data = data;
                    });


                // 事件绑定
                // --------------------
                $scope.allChecked = false;
                $scope.selectAll = function (e) {
                    $scope.allChecked = !$scope.allChecked;
                    $scope.$broadcast('widget-table:checkAll', $scope.allChecked);
                };


                var checkedRows = {};

                $scope.$on('widget-table-row:checked', function (event, data) {

                    var index = data.index,
                        checkedRow = {
                            data: $scope.config.data.rows[index],
                            index: index
                        };
                    if (data.checked) {
                        checkedRows[index] = checkedRow;
                    } else {
                        delete checkedRows[index];
                    }
                    console.log(checkedRows);
                });
            }
        };
    }])

    .directive('widgetTableRow', function () {
        return {
            restrict: 'A',
            require: '^widgetTable',
            scope: {
                index: '='
            },
            replace: true,
            transclude: true,
            template: '<tr ng-transclude=""></tr>',
            link: function ($scope, $elem, $attr, $superCtrl) {

                $scope.checked = false;

                // 接收checkbox 事件
                $scope.$on('widget-checkbox:checked', function (event, data) {
                    event.stopPropagation(); // 停止传播

                    $scope.checked = data;

                    // 向上发送事件
                    $scope.$emit('widget-table-row:checked', {
                        index: $scope.index,
                        checked: data
                    });
                });

                // 接收全选事件
                $scope.$on('widget-table:checkAll', function (event, data) {
                    $scope.$broadcast('widget-checkbox:checking', data);
                });

                $elem.on('click', function (e) {
                    $scope.$broadcast('widget-checkbox:checking', $scope.checked);
                });

            }
        };
    })

    .directive('widgetTablePagination', function () {
        return {
            restrict: 'A',
            require: '^widgetTable',

            link: function ($scope, $elem, $attr, $superCtrl) {

            }
        };
    })

;