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
                data: "=" // 注意要小写, 因为 html 不识别大小写
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

                // 每个指令只能定义一个 ng-transclude, 所以需要 $transclude, 注意这时不能出现 ng-transclude
                // -----------------------
                //$transclude(function (clone) {
                //    var bodyBlock = $element.find('div.transclude-body'); // 模版中定位
                //
                //    clone.filter(function (i, e, arr) { // clone 是html 中的代码
                //
                //        // 若有 widget-panel-footer 指令, 则加入
                //        if (e.nodeName.toLowerCase() === 'widget-panel-footer') {
                //            bodyBlock.parent().after(e); // 添加到body后面
                //        } else {
                //            bodyBlock.append(e);
                //        }
                //    });
                //});
            },
            link: function ($scope, $elem, $attrs) {
                // 定义组件的默认行为
                // -----------------------
                $scope.isHide = false;
                $scope.icon = 'fa fa-minus';
                $scope.toggle = function () {
                    $scope.isHide = !$scope.isHide;
                    $scope.icon = $scope.isHide ? 'fa fa-plus' : 'fa fa-minus';
                };
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
            restrict: 'EC',
            transclude: true,
            template: '<div class="panel-footer" ng-transclude=""></div>',

            // 只有依赖了父指令, 才有 superCtrl 参数
            link: function (scope, element, attrs, superCtrl) {

                // 调用父指令控制器
                superCtrl.addFooter(element);
            }
        };
    })
;