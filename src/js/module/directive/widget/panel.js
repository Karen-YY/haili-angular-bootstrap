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
                minable: '=',
                data: "=" // 注意要小写, 因为 html 不识别大小写
            },

            controller: function ($scope, $element, $attrs, $transclude) {
                // 定义组件的默认行为
                // -----------------------
                $scope.isHide = false;
                $scope.icon = 'fa fa-minus';
                $scope.toggle = function () {
                    $scope.isHide = !$scope.isHide;
                    $scope.icon = $scope.isHide ? 'fa fa-plus' : 'fa fa-minus';
                };

                // 每个指令只能定义一个 ng-transclude, 所以需要 $transclude, 注意这时不能出现 ng-transclude
                // -----------------------
                $transclude(function (clone) {
                    var bodyBlock = $element.find('div.transclude-body'); // 模版中定位

                    clone.filter(function (i, e, arr) { // clone 是html 中的代码

                        // 若有 widget-panel-footer 指令, 则加入
                        if (e.nodeName.toLowerCase() === 'widget-panel-footer') {
                            bodyBlock.parent().after(e); // 添加到body后面
                        } else {
                            bodyBlock.append(e);
                        }
                    });
                });
            },
            templateUrl: '/app/tpl/widget/panel.html',
            link: function (scope, elem, attrs) {

            }
        };
    })

    .directive('widgetPanelFooter', function () {
        return {
            restrict: 'EA',
            transclude: true,
            template: '<div class="panel-footer" ng-transclude=""></div>'
        };
    })
;