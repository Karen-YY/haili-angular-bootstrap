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
                this.select = function (index, selected, data) {
                    $scope.select(index, selected, data);
                };

                // 点击时触发
                this.onSelect = function (index, selected, data) {
                    $scope.config.onSelect && $scope.config.onSelect(index, selected, data);
                };

            },
            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {
                        selectedItems: {
                            length: 0
                        }, // 已选的项初始化
                        getSelect: function () {

                        }
                    },
                    newConfig = $scope.config, // 传进来的参数
                    inputerElem = $elem.find('input.inputer')
                    ;

                // 转移类到输入元素中...
                widgetService.transferAttr($elem, inputerElem, $attr, 'class');

                $scope.config = widgetService.concatConfig(defaultConfig, newConfig);

                // 等待请求返回的数据
                widgetService.getData($scope.config,
                    function (data) {
                        $scope.config.data = data;
                        $scope.loaded = true;

                    });


                // 属性设置
                // ------------------------------


                // 事件绑定
                // ------------------------------

                // 打开, 关闭下拉框
                $scope.toggle = function () {
                    $scope.open = !$scope.open;
                };

                // 全选
                $scope.selectAll = function (data) {
                    $scope.$broadcast('widget-select:selectAll', data);
                };

                // 选中一条
                $scope.select = function (index, selected, data) {

                    if (!$scope.config.selectedItems[index]) {
                        $scope.config.selectedItems[index] = data;
                        $scope.config.selectedItems.length++;
                    } else if(!selected) {
                        delete $scope.config.selectedItems[index];
                        $scope.config.selectedItems.length--;
                    }
                };

                //// 搜索文本
                $scope.config.getValue = function () {
                    var output = '',
                        input = $scope.config.selectedItems,
                        textField = $scope.config.textField;
                    for (var k in input) {
                        if (input.hasOwnProperty(k) && k !== 'length') {
                            output += (input[k][textField] || '') + ',';
                        }
                    }
                    return output;
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
                data: '='
            },
            template:
            '<li>' +
            '<a ng-class="{\'selected\': selected}">' +
            '<span>{{data.text}}</span>' +
            '<i class="fa" ng-class="{\'fa-check\': selected}"></i>' +
            '</a>' +
            '</li>',

            link: function ($scope, $elem, $attr, $superCtrl) {

                //// 点击事件
                //$elem.click(function (e) {
                //    $scope.selected = !$scope.selected;
                //    $scope.$apply(); // 强制进入 $digest 循环
                //});
                //
                //// 全选事件
                //$scope.$on('widget-select:selectAll', function(event, data) {
                //    $scope.selected = data;
                //});
                //
                //// 监听值的变化
                //$scope.$watch('selected', function(oldV, newV) {
                //    var item = {
                //        index: $scope.index,
                //        selected: $scope.selected,
                //        data: $scope.data
                //    };
                //
                //    // 添加到已选对象
                //    $superCtrl.select($scope.index, item);
                //
                //    // 点击时触发
                //    $superCtrl.onSelect(item);
                //});

                // 点击事件
                $elem.on('click', function (e) {
                    // 强制进入 $digest 循环
                    $scope.$apply(function () {
                        $scope.selected = !$scope.selected;
                        changeState($scope.selected);
                    });
                });

                // 全选
                $scope.$on('widget-select:selectAll', function (event, selected) {
                    $scope.selected = selected ? selected : !$scope.selected;
                    changeState(selected);
                });

                function changeState(selected) {

                    $superCtrl.select($scope.index, selected, $scope.data); // 与父指令通信
                    $superCtrl.onSelect($scope.index, selected, $scope.data); // 点击时触发
                }

            }
        };
    })
;