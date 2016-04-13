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
            //template:
            //    '<select ng-model="seleted" ng-options="a.text for a in config.data" class="widget-select">' +
            //        '<option value="">--请选择--</option>' +
            //    '</select>',

            // 小的组件就直接写在js代码里算了...发请求也要占资源的...
            template:
            '<div class="input-group dropdown widget-select">' +
                '<input class="form-control" type="text" /> ' +
                '<div class="input-group-btn">' +
                    '<button class="btn btn-default">' +
                        '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
                    '<li>' +
                    '<a href="">Action</a></li><li><a href="#">Another action</a>' +
                    '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>',

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