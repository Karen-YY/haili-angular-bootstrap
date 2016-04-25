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

            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {
                        //valueField: 'index',
                        getSelect: function () {

                        }
                    },
                    newConfig = $scope.config, // 传进来的参数
                    inputElem = $elem.find('input.inputer'), // input 标签
                    lastItem = {}, // 记住上次选择的, 用于单选
                    selectedText = '', // 文本
                    selectedItems = {} // 保存已选的 item
                    ;

                /* <-------------- 初始化 -------------- */

                // 转移属性到目标元素中
                widgetService.transferAttr($elem, inputElem, $attr, 'class');

                // 更新配置
                $scope.config = widgetService.concatConfig(defaultConfig, newConfig);

                // 等待请求返回的数据
                widgetService.getData($scope.config,
                    function (data) {
                        $scope.config.data = data;
                        $scope.loaded = true;
                        $scope.select(getItem('Java'));

                    });

                // 已选项
                $scope.selectedItems = { length: 0 };


                /* <-------------- 事件绑定 -------------- */

                // 全选 反选
                $scope.selectAll = function (type) {
                    var data = $scope.config.data;
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (type) {
                            // 全选
                            !data[i].selected && $scope.select(data[i]);
                        } else {
                            // 反选
                            $scope.select(data[i]);
                        }
                    }
                };

                // 选择
                $scope.select = function (item) {

                    if ($scope.config.multiple || lastItem === item) {
                        // 多选
                        item.selected = !item.selected;
                    } else {
                        // 单选
                        lastItem.selected = false;
                        item.selected = !item.selected;
                        lastItem = item;
                    }
                    selectFilter(); // 更新
                    item.selected && $scope.config.onSelect && $scope.config.onSelect(item);
                    !item.selected && $scope.config.onUnSelect && $scope.config.onUnSelect(item);
                };

                // 更新操作
                function selectFilter() {
                    var data = $scope.config.data,
                        textField = $scope.config.textField,
                        flag = false;

                    selectedText = '';
                    selectedItems = {};

                    for (var i = 0, len = data.length; i < len; i++) {
                        if (data[i].selected) {
                            if (flag) {
                                selectedText += ',';
                            }
                            flag = true;
                            selectedText += data[i][textField] || '';
                            selectedItems[i] = data[i];
                        }
                    }
                    inputElem.val(selectedText);
                }

                // getItem
                function getItem (value) {
                    var data = $scope.config.data,
                        valueField = $scope.config.valueField;

                    for (var i = 0, len = data.length; i < len; i++) {
                        if (data[i][valueField] === value) {
                            return data[i];
                        }
                    }
                    return null;
                }

                // 获取文本
                $scope.config.getValue = function () {
                    return selectedText;
                };

                $scope.config.getSelectedItems = function() {
                    return selectedItems;
                };

            }
        };
    }])

;