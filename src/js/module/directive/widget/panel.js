/**=========================================================
 * Module: src/js/module/directive/dire-panel.js
 * panel 指令
 * @author: haili042
 * @time: 2016年4月10日 14:20:04
 =========================================================*/

App
    .directive('widgetPanel', function () {

        return {
            restrict: "EA",
            transclude: true, // 替换位置
            scope: {
                title: '@',
                minable: '=', // 是否可以最小化
                closeable: '=', // 是否可以关闭
                responsive: '=' // 是否是响应式
            },
            templateUrl: '/app/tpl/widget/panel.html',

            controller: function ($scope, $element, $attrs, $transclude) {
                /**
                 * controller 最先执行, 适用于指令之间的交互, 为其他指令提供API
                 * compile 和 link 同时存在, 则执行 compile , 不执行 link, 建议使用 link
                 * link中 进行 dom 事件绑定, 数据绑定
                 * */

                // 供子指令调用
                this.addFooter = function (element) {
                    $element.find('.panel').append(element);
                };

            },

            link: function ($scope, $elem, $attrs) {
                // 定义组件的默认行为
                // -----------------------

                // 默认为展开
                $scope.isHide = false;

                // 展开 / 收起
                $scope.toggle = function () {
                    $scope.isHide = !$scope.isHide;
                    $scope.icon = $scope.isHide ? 'fa fa-plus' : 'fa fa-minus';
                };

                // 关闭
                $scope.close = function () {
                    $elem.remove();
                };

            }
        };
    })

    // 子控制器
    .directive('widgetPanelFooter', function () {
        return {
            require: '^widgetPanel', // 依赖父控制器
            restrict: 'EA',
            transclude: true,
            template: '<div class="panel-footer" ng-transclude=""></div>',

            // 只有依赖了父指令, 才有 superCtrl 参数
            link: function ($scope, $elem, $attrs, $superCtrl) {

                // 调用父指令控制器
                $superCtrl.addFooter($elem);
            }
        };
    })
;