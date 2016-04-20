/**=========================================================
 * Module: src/js/module/directive/widget/select.js
 * select 指令
 * @author: haili042
 * @time: 2016年4月13日 17:19:22
 =========================================================*/

App

    // 复选框
    .directive('widgetSelect', ['widgetService', function (widgetService) {
        return {
            restrict: 'EA',
            scope: {
                config: '='
            },
            templateUrl: '/app/tpl/widget/form-select.html',
           /* template:
            '<div class="widget-select">'+
            '  <div class="dropdown" ng-class="{\'open\': open}">'+
            '    <div class="has-feedback">'+
            '      <input class="form-control inputer" ng-click="toggle()" readonly="readonly"'+
            '           value="{{selectedItems | selectFilter:config.textField}}" />'+
            '      <span class="fa fa-caret-down form-control-feedback text-muted"></span>'+
            '    </div>'+
            '    <div class="dropdown-menu p-sm">'+
            '      <div class="input-group input-group-sm">'+
            '        <input type="text" class="form-control" ng-model="searchText"/>'+
            '        <span class="input-group-btn">'+
            '          <button class="btn btn-default" type="button">'+
            '            <i class="fa fa-search text-muted"></i>'+
            '          </button>'+
            '        </span>'+
            '      </div>'+
            '      <div class="actionbox mt-sm" ng-if="config.multiple">'+
            '        <div class="btn-group btn-group-sm btn-block text-center">'+
            '          <button class="btn btn-default" ng-click="selectAll(true)">全选</button>'+
            '          <button class="btn btn-default" ng-click="selectAll(false)">反选</button>'+
            '        </div>'+
            '      </div>'+
            '      <ul class="mt-sm">'+
            '        <widget-loading ng-hide="loaded" class="oval"></widget-loading>'+
            '        <li ng-repeat="item in config.data | filter:{text:searchText}"'+
            '            widget-select-item'+
            '            index="{{$index}}"'+
            '            selected="selectedItems[$index]"'+
            '            data="item"'+
            '                >'+
            '        </li>'+
            '      </ul>'+
            '    </div>'+
            '  </div>'+
            '</div>',*/

            controller: function ($scope) {

                // 选中一条
                this.select = function (index, itemEle) {
                    var itemData = $scope.config.data[index];
                    $scope.select(index, itemEle);
                };

                // 反选中一条
                this.unSelect = function (index) {
                    var itemData = $scope.config.data[index];
                    $scope.unSelect(index, itemData);
                };

                // 点击时触发
                this.onSelect = function (index) {
                    var itemData = $scope.config.data[index];
                    $scope.config.onSelect && $scope.config.onSelect(index, itemData);
                };

                // 点击时触发
                this.onUnSelect = function (index) {
                    var itemData = $scope.config.data[index];
                    $scope.config.onUnSelect && $scope.config.onUnSelect(index, itemData);
                };

            },
            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {
                        valueField: 'index',
                        getSelect: function () {

                        }
                    },
                    newConfig = $scope.config, // 传进来的参数
                    inputerElem = $elem.find('input.inputer')
                    ;


                /* <-------------- 初始化 -------------- */

                // 转移属性到目标元素中
                widgetService.transferAttr($elem, inputerElem, $attr, 'class');
                // 更新配置
                $scope.config = widgetService.concatConfig(defaultConfig, newConfig);
                // 等待请求返回的数据
                widgetService.getData($scope.config,
                    function (data) {
                        $scope.config.data = data;
                        $scope.loaded = true;

                    });
                // 已选项
                $scope.selectedItems = { length: 0 };
                /* -------------- end 初始化 --------------> */


                /* <-------------- 事件绑定 -------------- */
                // 打开, 关闭下拉框
                $scope.toggle = function () {
                    $scope.open = !$scope.open;
                };

                // 全选
                $scope.selectAll = function (data) {
                    $scope.$broadcast('widget-select-item:selectAll', data);
                };

                // 选中一条
                $scope.select = function (index, itemEle) {

                    var data = $scope.config.data[index];
                    if ($scope.config.multiple) {
                        // 多选
                        $scope.selectedItems[index] = true;
                        $scope.selectedItems.length++;
                    } else {
                        // 单选
                        for (var i = 0, len = $scope.config.data.length; i < len; i++) {
                            if ($scope.config.data[i].selected) {
                                $scope.config.data[i].selected = false; // 删除旧的
                            }
                        }
                        $scope.$apply();

                        $scope.config.data[index].selected = true; // 增加新的
                    }

                    //if (!$scope.config.selectedItems[index]) {
                    //
                    //    if ($scope.config.multiple) {
                    //        // 多选
                    //        $scope.config.selectedItems[index] = data;
                    //        $scope.config.selectedItems.length++;
                    //    } else {
                    //        // 单选
                    //        for (var k in $scope.config.selectedItems) {
                    //            if (k !== 'length' && $scope.config.selectedItems.hasOwnProperty(k)) {
                    //                delete $scope.config.selectedItems[k]; // 删除旧的
                    //            }
                    //        }
                    //        $scope.config.selectedItems[index] = data; // 增加新的
                    //    }
                    //
                    //    $scope.config.selectedItems[index] = data;
                    //    $scope.config.selectedItems.length++;
                    //}
                };

                // 取消选择
                $scope.unSelect = function (index, data) {
                    delete $scope.selectedItems[index];
                    $scope.selectedItems.length--;
                    if ($scope.config.multiple) {
                        // 多选
                    } else {
                        // 单选

                    }
                };

                // 获取文本
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

                $scope.config.getSelectedItems = function() {
                    return $scope.selectedItems;
                };
                /* -------------- end 事件绑定 --------------> */

            }
        };
    }])

    .directive('widgetSelectItem', function () {
        return {
            restrict: 'EA',
            require: '^widgetSelect',
            scope: {
                index: "@",
                item: '=' // 减少双向绑定
            },
            template:
            '<li>' +
            '  <a ng-class="{\'selected\': item.selected}">' +
            '    <span>{{item.text}}</span>' +
            '    <i class="fa" ng-class="{\'fa-check\': item.selected}"></i>' +
            '  </a>' +
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
                    //$scope.$apply(function () {
                        $scope.item.selected = !$scope.item.selected;
                    //});
                    //changeState($scope.item.selected);
                });

                // 全选 / 反选
                $scope.$on('widget-select-item:selectAll', function (event, type) {
                    if (type) {
                        // 全选
                        $scope.selected && $elem.click();
                    } else {
                        // 反选
                        $elem.click();
                    }
                    //$scope.selected = selected ? selected : !$scope.selected;
                    //changeState(selected);
                });



                function changeState(selected) {

                    if (selected) {
                        $superCtrl.select($scope.index, $elem); // 与父指令通信
                        $superCtrl.onSelect($scope.index, $elem); // 点击时触发
                    } else {
                        $superCtrl.unSelect($scope.index, $elem); // 与父指令通信
                        $superCtrl.onUnSelect($scope.index, $elem); // 点击时触发
                    }
                }
            }
        };
    })
;