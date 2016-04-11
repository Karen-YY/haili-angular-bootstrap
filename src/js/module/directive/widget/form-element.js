/**=========================================================
 * Module: src/js/module/directive/widget/form-element.js
 * 表单元素指令
 * @author: haili042
 * @time: 2016年4月11日 14:38:41
 =========================================================*/

App
    .directive('widgetFormElement', function () {

        return {
            restrict: "EC",
            scope: {
                config: "=" // 注意要小写, 因为 html 不识别大小写
            },
            controller: function ($scope) {

                // 默认参数
                var defaultConfig = {},

                    newConfig = $scope.config // 传进来的参数
                    ;

                // jquery 深拷贝
                $scope.config = $.extend(true, {}, defaultConfig, newConfig);

            },
            link: function (scope, elem, attrs) {
            }
        };

    })

    // 单选框
    .directive('widgetCheckbox', function () {
        return {
            restrict: 'EC',
            scope: {},
            replace: true,
            templateUrl: '/app/tpl/widget/form-checkbox.html',

            link: function (scope, elem, attr) {

                var checkboxEle = elem.find('input[type=checkbox]');

                // 表单元素必备
                attr.id && checkboxEle.attr('id', attr.id);
                attr.name &&　checkboxEle.attr('name', attr.name);
            }
        };
    })

    // 开关
    .directive('widgetSwitch', function () {
        return {
            restrict: 'EC',
            scope: {
                checked: '='
            },
            replace: true,
            templateUrl: '/app/tpl/widget/form-switch.html',

            link: function (scope, elem, attr) {

                var checkboxEle = elem.find('input[type=checkbox]');

                // 表单元素必备
                attr.id && checkboxEle.attr('id', attr.id);
                attr.name &&　checkboxEle.attr('name', attr.name);
            }
        };
    })
;