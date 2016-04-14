/**=========================================================
 * Module: src/js/module/directive/chart-dire.js
 * chart指令, 使用了基于 jquery 的 highchart
 * @author: haili042
 * @time: 2016年4月9日 17:39:30
 =========================================================*/

App.directive('widgetChart', function () {

    return {
        restrict: "EA",
        scope: {
            config: "=" // 注意要小写, 因为 html 不识别大小写
        },
        template:
            '<div class="table-responsive">' +
                '<div class="widget-chart"></div>' +
            '</div>',
        link: function ($scope, $elem, $attrs) {

            var defaultConfig = {
                    chart: {
                        animation: true
                    },
                    credits: {
                        enabled: true,
                        text: 'haili angular bootstrap admin'
                    }
                }, // 默认参数

                newConfig = $scope.config // 传进来的参数
                ;

            // jquery 深拷贝
            $scope.config = $.extend(true, {}, defaultConfig, newConfig);

            try {
                var chart = $elem.find('div.widget-chart');
                $elem.removeClass($attrs.class);
                chart.addClass($attrs.class);
                chart.highcharts($scope.config);
            } catch (e) {
                console.log("error in creating chart :" + e);
            }
        }
    };

});