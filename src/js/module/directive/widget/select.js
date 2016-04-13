/**=========================================================
 * Module: src/js/module/directive/widget/select.js
 * select 指令
 * @author: haili042
 * @time: 2016年4月13日 17:19:22
 =========================================================*/

App

    // 复选框
    .directive('widgetSelect', ['$q', '$http', 'widgetGetData', function ($q, $http, widgetGetData) {
        return {
            restrict: 'EA',
            scope: {
                config: '='
            },
            replace: true,
            template:
                '<select ng-model="seleted" ng-options="a.text for a in config.data" class="widget-select">' +
                    '<option value="">--请选择--</option>' +
                '</select>',

            link: function ($scope, $elem, $attr) {

                // 默认参数
                var defaultConfig = {},
                    newConfig = $scope.config // 传进来的参数
                    ;

                // 等待请求返回的数据
                widgetGetData
                    .setConfig(defaultConfig, newConfig)
                    .getPromise()
                    .then(function (data) {
                        $scope.config.data = data;
                    });

            }
        }
    }])
;