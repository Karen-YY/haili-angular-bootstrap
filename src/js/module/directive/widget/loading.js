/**=========================================================
 * Module: src/js/module/directive/loading-icon.js
 * loading 菊花 指令
 * @author: haili042
 * @time: 2016年4月17日 11:14:19
 =========================================================*/

App
    // 基本
    .directive('widgetLoading', function () {
        return {
            $scope: {
                abs: '='
            },
            restrict: 'EA',
            controller: function ($scope) {
                this.d = function (d) {
                    $scope.d = d;
                };
            },
            link: function ($scope, $elem, $attr) {
                $elem.addClass();
            }
        };
    })

    // 形状1
    // 因为限制类型那个为class, 所以命名不要名为 widget-loading-rotate, 防止循环调用
    .directive('rotate', function () {
        return {
            restrict: 'C',
            require: '^widgetLoading',
            template:
            '<div class="widget-loading">' +
            '  <div class="mask"></div>' +
            '  <div class="icon-wrap" >' +
            '    <div class="icon-rotate">' +
            '      <div></div>' +
            '      <div></div>' +
            '      <div></div>' +
            '      <div></div>' +
            '      <div></div>' +
            '      <div></div>' +
            '      <div></div>' +
            '      <div></div>' +
            '    </div>' +
            '  </div>' +
            '</div>',
            link: function ($scope, $elem, $attr) {

            }
        };
    })

    // 形状2
    .directive('oval', function () {
        return {
            restrict: 'C',
            require: '^widgetLoading',
            template:
            '<div class="widget-loading">' +
            '  <div class="mask"></div>' +
            '  <div class="icon-wrap"><div class="icon-oval"></div></div>' +
            '</div>',
            link: function ($scope, $elem, $attr) {

            }
        };
    })

    // 形状3 , gif 图片
    .directive('gif', function () {
        return {
            restrict: 'C',
            require: '^widgetLoading',
            template:
            '<div class="widget-loading">' +
            '  <div class="mask"></div>' +
            '  <div class="icon-wrap"><img src="/app/img/loading.gif" class="icon-gif"></div>' +
            '</div>',
            link: function ($scope, $elem, $attr) {

            }
        };
    })
;