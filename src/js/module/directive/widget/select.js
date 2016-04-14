/**=========================================================
 * Module: src/js/module/directive/widget/select.js
 * select 指令
 * @author: haili042
 * @time: 2016年4月13日 17:19:22
 =========================================================*/

App

    // 复选框
    .directive('widgetSelect', ['$q', '$http', 'widgetService', function ($q, $http, widgetService) {
        return {
            restrict: 'EA',
            scope: {
                config: '='
            },

            templateUrl: '/app/tpl/widget/form-select.html',

            controller: function ($scope) {

                // 选中一条
                this.addSelectedItem = function (item) {

                    if (item.selected) {
                        $scope.selectedItems[item.index] = item;
                    } else {
                        delete $scope.selectedItems[item.index];
                    }
                };

            },
            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {},
                    newConfig = $scope.config // 传进来的参数
                    ;

                // 所选的项
                $scope.selectedItems = {};

                // 等待请求返回的数据
                widgetService
                    .setConfig(defaultConfig, newConfig)
                    .getData(function (data) {
                        $scope.config.data = data;
                    });

                // 打开, 关闭
                $scope.toggle = function () {
                    $scope.open = !$scope.open;
                };

                // 全选
                $scope.selectAll = function(data) {
                    $scope.$broadcast('widget-select:selectAll', data);
                };
            }
        };
    }])

    .directive('widgetSelectItem', function () {
        return {
            restrict: 'EA',
            require: '^widgetSelect',
            scope: {
                index: '=',
                selected: '=',
                data: '='
            },
            template:
            '<li>' +
                '<a>' +
                    '<span>{{data.text}}</span>' +
                    '<i class="fa" ng-class="{\'fa-check\': selected}"></i>' +
                '</a>' +
            '</li>',

            link: function ($scope, $elem, $attr, $superCtrl) {

                $elem.on('click', function (e) {
                    var item;
                    $scope.$apply(function () {
                        $scope.selected = !$scope.selected;
                    });

                    item = {
                        index: $scope.index,
                        selected: $scope.selected
                    };
                    $superCtrl.addSelectedItem(item);
                });

                $scope.$on('widget-select:selectAll', function(event, data) {
                    $scope.selected = data;
                });

            }
        };
    })
;